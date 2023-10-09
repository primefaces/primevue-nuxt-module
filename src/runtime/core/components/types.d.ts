import { ConstructsType, ItemType } from '../types';

export interface ComponentsType extends ConstructsType {}

export interface ComponentType extends ItemType {
  use?: {
    as: string;
  };
}
