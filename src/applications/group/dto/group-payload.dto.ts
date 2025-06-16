import { ApiProperty } from "@nestjs/swagger";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto"; // asumsinya sudah ada

export class GroupPayloadDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ type: [UserPayloadDto] })
    members: UserPayloadDto[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
