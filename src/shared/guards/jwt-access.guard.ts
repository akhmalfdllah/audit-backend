import { AuthGuard } from "@nestjs/passport";
import { JwtAccessName } from "src/configs/jwt.config";

export class JwtAccessGuard extends AuthGuard(JwtAccessName) {}
