'use strict';

import path from 'path'; 
import { BindResolverFunction, FactoryOptions } from '../typedefs';

export default function ({ fieldName, typeName, resolverPath }: FactoryOptions): BindResolverFunction {
  if (!resolverPath) {
    throw new Error('no path specified');
  }

  const file = path.join(process.cwd(), resolverPath);

  const resolveFunction = require(file);

  return function bindDirectiveResolver(...args) {
    return resolveFunction({
      fieldName, 
      typeName,
      resolverArguments: args
    });
  }
};