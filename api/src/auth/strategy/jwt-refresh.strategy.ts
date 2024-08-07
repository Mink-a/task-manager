import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refresh_token"),
      ignoreExpiration: false,
      secretOrKey: "secret",
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, loginId: payload.loginId, role: payload.role };
  }
}
