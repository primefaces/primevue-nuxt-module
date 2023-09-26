export interface ConstructsType {
  prefix?: string | undefined;
  import?: string[] | ((list: any) => string[] | undefined) | undefined;
  exclude?: string[] | ((list: any) => string[] | undefined) | undefined;
}
