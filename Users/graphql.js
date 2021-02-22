const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const fetch = require("node-fetch");

const port = 5000; // users graphQL server port
const apiUrl = "http://localhost:4003"; // users service baseURL

// @key is directive defines going to resolve on some key
/* fields defines on which key wants to resolve 
 Eg: in below example it Going to resolve UM_User by id field
*/
const typeDefs = gql`
  type UM_User @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
  }

  extend type Query {
    UM_user(id: ID!): UM_User
    UM_users: [UM_User]
  }
`;

const resolvers = {
  UM_User: {
    // make sure above key matches with your type eg: UM_User

    // __resolveReference helps to resolve from Client reference
    async __resolveReference({id}, args) {
      const data = await fetch(`${apiUrl}/user/${id}`).then((res) =>
        res.json()
      );
      return data.data;
    },
  },
  Query: {
    async user(_, { id }) {
      const data = await fetch(`${apiUrl}/user/${id}`).then((res) =>
        res.json()
      );
      return data.data;
    },
  },
};

// make sure build your schema with buildFederatedSchema
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port }).then(({ url }) => {
  console.log(`Users gql service ready at ${url}`);
});
