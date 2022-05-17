'use strict';

import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';
import { loadResolver } from './factory';

export function bindDirectiveTransformer(schema: GraphQLSchema, directiveName: string = 'bind'): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig, fieldName, typeName) => {
      const bindDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (!bindDirective) {
        return fieldConfig;
      }
      
      const { uri } = bindDirective;

      return {
        ...fieldConfig,
        resolve: loadResolver(typeName, fieldName, uri)
      };
    },
  });
}
