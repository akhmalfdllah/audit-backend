import { AuthGuard } from "@nestjs/passport";
import { JwtRefreshName } from "src/configs/jwt.config";

export class JwtRefreshGuard extends AuthGuard([JwtRefreshName]) {}
