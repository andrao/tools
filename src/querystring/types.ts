/**
 * @interface IQueryParams
 * @description URL query parameters
 */
export type IQueryParams = Record<string, IQueryValue | Array<IQueryValue>>;

type IQueryValue = string | number | boolean;
