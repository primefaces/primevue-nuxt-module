export interface ConstructsType {
  prefix?: string | undefined;
  name?: (item: any) => string | undefined;
  include?: '*' | Array<string | { name: string; use?: { as: string } }> | ((list: any) => string[] | undefined) | undefined;
  exclude?: '*' | Array<string | { name: string; use?: { as: string } }> | ((list: any) => string[] | undefined) | undefined;
}

export interface ItemType {
  name?: string;
  as?: string;
  from?: string;
}
