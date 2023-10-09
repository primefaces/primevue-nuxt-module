import type { ResolvePathOptions } from './types';

export const Utils = {
  object: {
    isEmpty(value: any) {
      return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0) || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0);
    },
    isNotEmpty(value: any) {
      return !this.isEmpty(value);
    },
    isFunction(value: any) {
      return !!(value && value.constructor && value.call && value.apply);
    },
    isString(value: any, empty: boolean = true) {
      return typeof value === 'string' && (empty || value !== '');
    },
    getValue(obj: any, ...params: any) {
      return this.isFunction(obj) ? obj(...params) : obj;
    },
    getPath(fn: any, options: ResolvePathOptions) {
      return this.isFunction(fn) ? fn(options) : options.from;
    }
  }
};
