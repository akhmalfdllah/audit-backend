import { match } from "ts-pattern";

export const isEqual = <T>(expected: T, actual: T): boolean => {
  return expected === actual;
};

export const isNotEqual = <T>(expected: T, actual: T): boolean => {
  return expected !== actual;
};

export const isMatch = (value: any, otherValue: any) => {
  return match(value)
    .with(otherValue, () => true)
    .otherwise(() => false);
};

export const isNotMatch = (value: any, otherValue: any) => {
  return !isMatch(value, otherValue);
};

export * as Find from "./find.dto";
export * as Prop from "./prop.dto";
//export * as Inherit from "./inherit.dto";
