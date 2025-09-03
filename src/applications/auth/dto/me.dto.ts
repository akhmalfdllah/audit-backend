import { ApiProperty } from "@nestjs/swagger";

export class MeDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    role: string;
}
