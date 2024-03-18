export * from "./middleware";

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type TableColumnType = "string" | "number" | "date";

export enum FilterConditions {
  Equals = "eq",
  NotEquals = "ne",
  In = "in",
  NotIn = "notIn",
  Exists = "exists",
  Like = "like",
  Contains = "contains",
  Greater = "gt",
  Less = "lt",
  GreaterOrEqual = "gte",
  LessOrEqual = "lte",
}

export type FiltersValues = { where: { or: { and: Record<string, Partial<Record<FilterConditions, any>>>[] }[] } };
