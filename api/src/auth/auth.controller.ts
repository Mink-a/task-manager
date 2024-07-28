import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guard/local.guard";
import { User } from "./decorator/user.decorator";
import { LoginDto } from "./dto/login.dto";
import { JwtUserDto } from "./dto/jwt-user.dto";
import { RefreshTokenGuard } from "./guard/jwt-refresh.guard";
import { RefreshDto } from "./dto/refresh.dto";
import { UserEntity } from "src/users/entities/user.entity";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOperation({ summary: "Login with username and password" })
  @ApiResponse({ status: 200, description: "User successfully logged in.", type: UserEntity })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  async login(@User() user: JwtUserDto, @Body() loginDto: LoginDto) {
    console.log(loginDto, user);
    return this.authService.login(user);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("refresh")
  @ApiOperation({ summary: "Refresh JWT token" })
  @ApiResponse({ status: 200, description: "Token successfully refreshed." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  async refresh(@User() user: JwtUserDto, @Body() refresh_token: RefreshDto) {
    return this.authService.refresh(user, refresh_token);
  }
}
