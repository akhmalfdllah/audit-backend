import { ApiProperty } from '@nestjs/swagger';

export class Link {
    @ApiProperty()
    href: string;

    constructor(href: string) {
        this.href = href;
    }
}
