import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AesEveryWhere from "aes-everywhere";
import { RolesService } from "src/roles/roles.service";
import { UsersService } from "src/users/users.service";
import { AdResponseDto } from "./dto/ad-response.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AdService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private rolesService: RolesService,
  ) {}

  async login(data: { loginId: string; password: string }) {
    // ----test user start----
    if (data.loginId === "000000" && data.password === "password") {
      const userDetails = await this.usersService.findByLoginId("000000");
      return userDetails;
    }

    if (data.loginId === "909090" && data.password === "password") {
      const userDetails = await this.usersService.findByLoginId("909090");
      return userDetails;
    }
    // ----test user end----

    const resp = await this.authenticate(data.loginId, data.password);
    const roleInfo = await this.getDefaultRole();

    const createUserDto: CreateUserDto = {
      loginId: resp.Data.login_id,
      username: resp.Data.user_name,
      deptCode: resp.Data.branch_code,
      roleId: roleInfo.id,
    };

    const user = await this.usersService.createOrUpdate(createUserDto);
    const userDetails = await this.usersService.findByLoginId(user.loginId);

    return userDetails;
  }

  async getDefaultRole() {
    const role = await this.rolesService.findByName("user");
    return role;
  }

  async authenticate(loginId: string, password: string) {
    const hashedPassword = AesEveryWhere.encrypt(password, this.configService.getOrThrow("AD_PASSWORD_KEY"));
    const body = this.prepareDataForLogin(loginId, hashedPassword);
    const response = await fetch(this.configService.getOrThrow("AD_LOGIN_URL"), {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const resp: AdResponseDto = await response.json();

    if (response.ok) {
      return resp;
    }

    throw new ForbiddenException({ message: "Invalid Credentials" });
  }

  prepareDataForLogin(loginId: string, password: string) {
    return new URLSearchParams({
      service_id: this.configService.getOrThrow("AD_LOGIN_SERVICE_ID"),
      client_id: this.configService.getOrThrow("AD_LOGIN_CLIENT_ID"),
      device_id: this.configService.getOrThrow("AD_LOGIN_DEVICE_ID"),
      device_name: "PC",
      app_platform: "browser",
      app_version: "1.0.0",
      os_version: "",
      fb_token: "",
      latitude: "",
      longitude: "",
      login_id: loginId,
      password,
    }).toString();
  }
}
