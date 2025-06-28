// auth-payload.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

export class AuthPayloadDto {
    @ApiProperty()
    jwtAccessToken: string;

    @ApiProperty()
    jwtRefreshToken: string;

    @ApiProperty({ type: () => UserPayloadDto })
    user: UserPayloadDto;
}
