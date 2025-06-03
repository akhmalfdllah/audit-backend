import { ApiProperty } from '@nestjs/swagger';

export class Action {
    @ApiProperty()
    name: string;

    @ApiProperty()
    href: string;

    @ApiProperty()
    method: string;

    constructor(values: Action) {
        Object.assign(this, values)
    }
}
