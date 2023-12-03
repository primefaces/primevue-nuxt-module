import { ConstructsType, ItemType } from '../types';

export interface ComposablesType extends Omit<ConstructsType, 'prefix'> {}

export interface ComposableType extends ItemType {}
