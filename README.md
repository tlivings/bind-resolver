# Schema based resolver binding

Allows the following concept: 

```graphql
type Query {
  exampleQuery: ResponseType @bind(uri:"function://./resolvers")
}

type ResponseType {
  field: String
}
```
Where a `uri` could have any registered protocol such as a lambda, etc.

Because `typeName` and `fieldName` will be passed to the given resolver, the same resolver could techincally be used for as many fields as necessary.

### Other ideas

- Perhaps utilizing configuration like `@bind(uri:"function://$env.RESOLVER_PATH")`
- Things like `lambda:` protocols should probably have lifecycle checks (is it available? does it respond?)
- All resolver factory execution should be cached (done), and resolvers memoized (not done)
- Configuration should be passed to `bindDirectiveTransformer` to support additional configuration propagation