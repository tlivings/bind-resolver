
import { parse } from 'url';

export type FactoryOptions = {
  fieldName: string,
  typeName: string,
  path: string|null
};

export type BindResolverArguments = {
  fieldName: string, 
  typeName: string, 
  resolverArguments: string
}

export type BindResolverFunction = (args: BindResolverArguments) => Function;

export type FactoryFunction = (options: FactoryOptions) => BindResolverFunction;

export const _cache: Map<string, BindResolverFunction> = new Map<string, BindResolverFunction>();

export function loadResolver(typeName: string, fieldName: string, uri: string) {
  const key = `${typeName}.${fieldName}`;

  if (_cache.has(key)) {
    return _cache.get(key);
  }
  
  const { protocol, path } = parse(uri);
  const factory: FactoryFunction = require(`./${protocol?.substring(0, protocol?.indexOf(':'))}`).default;
  const resolver: BindResolverFunction = factory({ typeName, fieldName, path });
  
  _cache.set(key, resolver);

  return resolver;
};