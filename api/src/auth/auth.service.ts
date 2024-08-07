import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { JwtUserDto } from "./dto/jwt-user.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { AdService } from "./ad.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private adService: AdService,
  ) {}

  async validateUser(loginId: string, pass: string) {
    const user = await this.adService.login({ loginId, password: pass });

    if (!user) {
      return null;
    }

    return user;
  }

  async login(user: JwtUserDto) {
    const payload = { loginId: user.loginId, sub: user.id, role: user.role };
    const responseUser = await this.usersService.findOne(user.id);
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: "7d" }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: "30d" }),
      user: responseUser,
    };
  }

  async refresh(user: JwtUserDto, refreshToken: RefreshDto) {
    console.log(refreshToken, user);
    const foundUser = await this.usersService.findOne(user.id);
    if (foundUser) {
      const payload = { loginId: foundUser.loginId, sub: foundUser.id, role: foundUser.Role };
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: "7d" }),
        refresh_token: this.jwtService.sign(payload, { expiresIn: "30d" }),
        user: foundUser,
      };
    }
  }
}
