import { match, P } from "ts-pattern";
import { BooleanStatus } from "src/configs/database.config";

export const transFormId = (id?: string) => {
  return match(id)
    .with(P.not(P.nullish), (value) => ({ id: value }))
    .otherwise(() => undefined);
};

export const transFormNullableId = (id?: string | null) => {
  return match(id)
    .with(P.string, (value) => ({ id: value }))
    .with(null, () => null)
    .otherwise(() => undefined);
};

export const transformLowercase = (text?: string) => {
  return match(text)
    .with(P.not(P.nullish), (value) => value.toLowerCase().trim())
    .otherwise(() => undefined);
};

export const transformBoolean = (status?: string) => {
  return match(status)
    .with(P.string, (value) => value === BooleanStatus.True)
    .otherwise(() => undefined);
};
