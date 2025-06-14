import { IntersectionType } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { Action, Link } from "src/shared/extra-dto/base/common.dto";
import { Actions, Links } from "src/shared/extra-dto/common.dto";
import { User } from "src/core/user/entities/user.entity";

const transformLinks = (user: User): Record<string, Link> => {
  const self = new Link(`/user/${user.id}`);
  const group = new Link(`/group?member=${user.id}`);
  //const nodes = new Link(`/node?developer=${user.id}`);
  return { self, group };
};

export class UserPayloadDto extends IntersectionType(User, Actions, Links) {
  @Expose()
  _action: Action[];

  @Expose()
  @Transform(({ obj }) => transformLinks(obj))
  _link: Record<string, Link>;
}

export * from "src/core/user/entities/user.entity";
