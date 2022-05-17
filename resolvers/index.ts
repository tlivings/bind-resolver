'use strict';

import { BindResolverArguments } from "../lib/typedefs";

module.exports = async function  ({ fieldName, typeName /*, resolverArguments*/ }: BindResolverArguments) {
  return {
    field: `${typeName}.${fieldName}`
  };
};