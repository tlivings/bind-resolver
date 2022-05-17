
export type FactoryOptions = {
  fieldName: string,
  typeName: string,
  resolverPath: string|null
};

export type BindResolverArguments = {
  fieldName: string, 
  typeName: string, 
  resolverArguments: string
}

export type BindResolverFunction = (args: BindResolverArguments) => Function;

export type FactoryFunction = (options: FactoryOptions) => BindResolverFunction;