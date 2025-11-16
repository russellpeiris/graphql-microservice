import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});
const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' }
];
// make sure to add GraphQLNonNull to the imports:
// import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull } from "graphql";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      users: {
        type: new GraphQLList(UserType),
        resolve: () => users
      },
      user: {
        type: UserType,
        args: { id: { type: new GraphQLNonNull(GraphQLID) } },
        resolve: (_, args) => users.find(user => user.id === args.id)
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      addUser: {
        type: UserType,
        args: {
          name: { type: new GraphQLNonNull(GraphQLString) },
          email: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: (_, args) => {
          const newUser = {
            id: String(users.length + 1),
            name: args.name,
            email: args.email
          };
          users.push(newUser);
          return newUser;
        }
      },
    },
  }),
});
