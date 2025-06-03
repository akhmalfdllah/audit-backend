import { ApiProperty } from "@nestjs/swagger";
import { Action } from "src/shared/extra-dto/base/action.dto";
import { Link } from "src/shared/extra-dto/base/link.dto";

export class Actions {
  @ApiProperty()
  _actions: Action[] = [];
}

export class Links {
  @ApiProperty()
  _links: Record<string, Link>;
}
