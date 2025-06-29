import { AuthGuard } from "@nestjs/passport";
import { JwtAccessName } from "src/configs/jtw.constant";

export class JwtAccessGuard extends AuthGuard(JwtAccessName) {}
