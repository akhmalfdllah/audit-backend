import { applyDecorators, UseInterceptors, UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAccessGuard } from "src/shared/guards/jwt-access.guard";

export function UploadFile() {
  return applyDecorators(UseGuards(JwtAccessGuard), UseInterceptors(FileInterceptor("file")));
}
