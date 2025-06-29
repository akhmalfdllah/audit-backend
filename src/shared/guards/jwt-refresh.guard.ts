import { AuthGuard } from "@nestjs/passport";
import { JwtRefreshName } from "src/configs/jtw.constant";

export class JwtRefreshGuard extends AuthGuard([JwtRefreshName]) {}
