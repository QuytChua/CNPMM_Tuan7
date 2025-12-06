const { ApolloServer, gql } = require("apollo-server");
const _ = require("lodash");

let cart = [
  { id: "1", title: "Harry Potter", price: 250000, quantity: 1 },
  { id: "2", title: "Clean Code", price: 350000, quantity: 2 },
];

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    price: Int!
    quantity: Int!
  }

  type Query {
    cart: [Book!]!
  }

  type Mutation {
    add(title: String!, price: Int!, quantity: Int): Book!
    updateQuantity(id: ID!, quantity: Int!): Book!
    remove(id: ID!): Boolean!
    checkout(ids: [ID!]!): [Book!]!
  }
`;

const resolvers = {
  Query: { cart: () => cart },
  Mutation: {
    add: (_, args) => {
      const item = { id: _.uniqueId(), ...args, quantity: args.quantity || 1 };
      cart.push(item);
      return item;
    },
    updateQuantity: (_, { id, quantity }) => {
      const item = cart.find((i) => i.id === id);
      if (item) item.quantity = quantity;
      return item;
    },
    remove: (_, { id }) => {
      console.log(`🗑️  Attempting to remove book with ID: ${id}`);
      const beforeLength = cart.length;
      cart = cart.filter((i) => i.id !== id);
      const afterLength = cart.length;

      if (beforeLength > afterLength) {
        console.log(
          `✅ Successfully removed book. Cart size: ${beforeLength} → ${afterLength}`
        );
        return true;
      } else {
        console.log(`❌ Book with ID ${id} not found in cart`);
        return false;
      }
    },
    checkout: (_, { ids }) => {
      const paid = cart.filter((i) => ids.includes(i.id));
      cart = cart.filter((i) => !ids.includes(i.id));
      return paid;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
  introspection: true,
  playground: true,
  plugins: [
    {
      requestDidStart() {
        return {
          didReceiveRequest(requestContext) {
            console.log(`📋 Received GraphQL request:`, {
              operationName: requestContext.request.operationName,
              query: requestContext.request.query?.replace(/\s+/g, " ").trim(),
              variables: requestContext.request.variables,
            });
          },
        };
      },
    },
  ],
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 GraphQL Server ready at ${url}`);
  console.log(`🔧 GraphQL Playground ready at ${url}`);
  console.log(`📚 Current cart has ${cart.length} books`);
});
