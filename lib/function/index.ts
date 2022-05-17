'use strict';

import { join } from 'path'; 
import { BindResolverFunction, FactoryOptions } from '..';

export default function ({ typeName, fieldName, path }: FactoryOptions): BindResolverFunction {
  if (!path) {
    throw new Error('no path specified');
  }

  const file = join(process.cwd(), path);

  const resolveFunction = require(file);

  return function bindDirectiveResolver(...args) {
    return resolveFunction({
      fieldName, 
      typeName,
      resolverArguments: args
    });
  }
};