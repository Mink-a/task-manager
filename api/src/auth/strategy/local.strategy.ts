import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { JwtUserDto } from "../dto/jwt-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "loginId",
      passwordField: "password",
    });
  }

  async validate(username: string, password: string): Promise<JwtUserDto> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { loginId: user.loginId, id: user.id, role: user.Role };
  }
}
