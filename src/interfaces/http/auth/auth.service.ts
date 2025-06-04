import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/modules/user/user.service";
import { SignUpBodyDto } from "src/interfaces/http/auth/dto/signup-body.dto";
import { SignInBodyDto } from "src/interfaces/http/auth/dto/signin-body.dto";
import type { JwtParams, JwtPayload } from "src/types/jwt.type";
import { JwtAccessSignOptions, JwtRefreshSignOptions } from "src/configs/jwt.config";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpBodyDto: SignUpBodyDto) {
    return await this.userService.create(signUpBodyDto);
  }

  async signIn(signInBodyDto: SignInBodyDto) {
    const user = await this.userService.verifyUser(signInBodyDto);
    const token = await this.generateTokens(user);
    const updated = await this.userService.updateRefreshToken(user, token.jwtRefreshToken);
    return { user: updated, ...token };
  }

  async newAccessToken(userId: string, refreshToken: string) {
    const user = await this.userService.verifyUserWithRefreshToken(userId, refreshToken);
    const jwtAccessToken = await this.generateAccessToken(user);
    return { user, jwtAccessToken };
  }

  async signOut(userId: string, refreshToken: string) {
    await this.userService.signOut(userId, refreshToken);
    return { message: "signout successfull!" };
  }

  private async generateAccessToken(data: JwtParams) {
    const payload: JwtPayload = {
      id: data.id,
      role: data.role,
    };
    const accessToken = this.jwtService.signAsync(payload, JwtAccessSignOptions);
    return accessToken;
  }

  private async generateRefreshToken(data: JwtParams) {
    const payload: JwtPayload = {
      id: data.id,
      role: data.role,
    };
    const refreshToken = this.jwtService.signAsync(payload, JwtRefreshSignOptions);
    return refreshToken;
  }

  private async generateTokens(data: JwtParams) {
    const [jwtAccessToken, jwtRefreshToken] = await Promise.all([
      this.generateAccessToken(data),
      this.generateRefreshToken(data),
    ]);
    return { jwtAccessToken, jwtRefreshToken };
  }
}
