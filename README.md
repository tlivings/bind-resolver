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