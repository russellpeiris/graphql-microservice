import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
});
const products = [
  { id: '1', name: 'Laptop' },
  { id: '2', name: 'Smartphone' }
  
];
// make sure to add GraphQLNonNull to the imports:
// import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull } from "graphql";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      products: {
        type: new GraphQLList(ProductType),
        resolve: () => products
      },
      product: {
        type: ProductType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: (_, args) => products.find(product => product.id === args.id)
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      addProduct: {
        type: ProductType,
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (_, args) => {
          const newProduct = {
            id: String(products.length + 1),
            name: args.name,
             
          };
          products.push(newProduct);
          return newProduct;
        }
      },
    },
  }),
});
