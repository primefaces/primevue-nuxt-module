export interface ConstructsType {
  prefix?: string | undefined;
  name?: (item: any) => string | undefined;
  include?: '*' | string[] | ((list: any) => string[] | undefined) | undefined;
  exclude?: '*' | string[] | ((list: any) => string[] | undefined) | undefined;
}

export interface ItemType {
  name?: string;
  as?: string;
  from?: string;
}
