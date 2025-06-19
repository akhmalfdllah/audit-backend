import { Controller, Get, Post, Delete, Body, Res, Req, HttpStatus } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Response, Request } from "express";
import { EnsureValid, RefreshTokenGuard } from "src/shared/decorators/common.decorator";
import { User } from "src/shared/decorators/params/common.decorator";
import { authDocs } from "./auth.docs";
import { AuthFacadeService } from "src/interfaces/http/auth/auth.facade.service";
import { CookieService } from "src/shared/services/cookie.service";
import { signInBodySchema, SignInBodyDto } from "src/applications/auth/dto/signin-body.dto";
import { signUpBodySchema, SignUpBodyDto } from "src/applications/auth/dto/signup-body.dto";
import { DecodedUser } from "src/types/jwt.type";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authFacadeService: AuthFacadeService,
    private readonly cookieService: CookieService,
  ) {}

  @Post("signup")
  @ApiOperation(authDocs.post_signup)
  @EnsureValid(signUpBodySchema)
  async signUp(@Body() signUpBodyDto: SignUpBodyDto) {
    return await this.authFacadeService.signUp(signUpBodyDto);
  }

  @Post("signin")
  @ApiOperation(authDocs.post_signin)
  @EnsureValid(signInBodySchema)
  async signIn(@Body() signInBodyDto: SignInBodyDto, @Res() res: Response) {
    const { jwtRefreshToken, ...payload } = await this.authFacadeService.signIn(signInBodyDto);
    this.cookieService.setCookieRefreshToken(res, jwtRefreshToken);
    return res.status(HttpStatus.OK).send(payload);
  }

  @Get("token")
  @ApiOperation(authDocs.get_token)
  @RefreshTokenGuard()
  async getNewAccessToken(@Req() req: Request, @User() user: DecodedUser) {
    const refreshToken = this.cookieService.getCookieRefreshToken(req);
    return await this.authFacadeService.newAccessToken(user.id, refreshToken);
  }

  @Delete("signout")
  @ApiOperation(authDocs.delete_signout)
  @RefreshTokenGuard()
  async signOut(@Req() req: Request, @Res() res: Response, @User() user: DecodedUser) {
    const refreshToken = this.cookieService.getCookieRefreshToken(req);
    const payload = await this.authFacadeService.signOut(user.id, refreshToken);
    this.cookieService.clearCookieRefreshToken(res);
    return res.status(HttpStatus.OK).send(payload);
  }
}