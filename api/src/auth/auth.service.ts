import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { JwtUserDto } from "./dto/jwt-user.dto";
import { UserEntity } from "src/users/entities/user.entity";
import { RefreshDto } from "./dto/refresh.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginId: string, pass: string): Promise<UserEntity> {
    const user = await this.usersService.findByLoginId(loginId);

    if (user && user.password === pass) {
      return user;
    }

    return null;
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
      const payload = { loginId: foundUser.loginId, sub: foundUser.id, role: foundUser.role };
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: "7d" }),
        refresh_token: this.jwtService.sign(payload, { expiresIn: "30d" }),
        user: foundUser,
      };
    }
  }
}
