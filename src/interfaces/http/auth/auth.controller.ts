import { Controller, Get, Post, Delete, Body, Res, Req, HttpStatus, HttpCode } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Response, Request } from "express";
//import { ConfigService } from '@nestjs/config';
import { EnsureValid, RefreshTokenGuard } from "src/shared/decorators/common.decorator";
import { User } from "src/shared/decorators/params/common.decorator";
import { authDocs } from "./auth.docs";
import { AuthFacadeService } from "src/interfaces/http/auth/auth.facade.service";
import { CookieService } from "src/shared/services/cookie.service";
import { signInBodySchema, SignInBodyDto } from "src/applications/auth/dto/signin-body.dto";
import { DecodedUser } from "src/types/jwt.type";
import { AuditAction } from "src/core/audit-log/entities/audit-log.entity";
import { AuditActionDecorator } from "src/shared/decorators/audit-action.decorator";

@Controller("auth")
//@UseInterceptors(AuditLogInterceptor)
export class AuthController {
  constructor(
    private readonly authFacadeService: AuthFacadeService,
    private readonly cookieService: CookieService,
    //private readonly configService: ConfigService,
  ) { }

  // @Post("signup")
  // @ApiOperation(authDocs.post_signup)
  // @EnsureValid(createUserBodySchema)
  // async signUp(@Body() dto: CreateUserBodyDto) {
  //   return this.createUserUseCase.execute(dto);
  // }

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  @EnsureValid(signInBodySchema)
  @AuditActionDecorator(AuditAction.SIGNIN)
  async signIn(
    @Body() dto: SignInBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authFacadeService.signIn(dto);
    const { accessToken, refreshToken, user } = result;

    //const cookieConfig = this.configService.get('cookie');

  // refresh_token
res.cookie("refresh_token", refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

// access_token
res.cookie("access_token", accessToken, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: 60 * 60 * 1000,
});

// role (boleh dibaca JS)
res.cookie("role", user.role, {
  secure: true,
  sameSite: "none",
  httpOnly: false,
  path: "/",
  maxAge: 60 * 60 * 1000,
});
    return {
      user,
      role: user.role
    };
  }

  @Get("token")
  @ApiOperation(authDocs.get_token)
  @RefreshTokenGuard()
  async getNewAccessToken(@Req() req: Request, @User() user: DecodedUser) {
    const refreshToken = this.cookieService.getCookieRefreshToken(req);
    console.log("🍪 Cookie refresh_token diterima?", refreshToken);
    return await this.authFacadeService.newAccessToken(user.id, refreshToken);
  }

  @Delete("signout")
  @HttpCode(HttpStatus.OK)
  @ApiOperation(authDocs.delete_signout)
  @AuditActionDecorator(AuditAction.SIGNOUT)
  @RefreshTokenGuard()
  async signOut(@Req() req: Request, @Res() res: Response, @User() user: DecodedUser) {
    const refreshToken = this.cookieService.getCookieRefreshToken(req);
    const payload = await this.authFacadeService.signOut(user.id, refreshToken);
    this.cookieService.clearCookieRefreshToken(res);
    res.status(HttpStatus.OK).json(payload); // ✅ INI WAJIB
  }
}

