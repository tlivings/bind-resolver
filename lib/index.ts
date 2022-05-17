'use strict';

import { parse } from 'url';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import { FactoryFunction } from './typedefs';

export function bindDirectiveTransformer(schema: GraphQLSchema, directiveName: string = 'bind'): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig, fieldName, typeName) => {
      const bindDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (!bindDirective) {
        return fieldConfig;
      }
      
      const { uri } = bindDirective;

      const { protocol, path } = parse(uri);

      const factory: FactoryFunction = require(`./${protocol?.substring(0, protocol?.indexOf(':'))}`).default;

      const resolver = factory({
        fieldName,
        typeName,
        resolverPath: path
      });

      return {
        ...fieldConfig,
        resolve: resolver
      };
    },
  });
}
