const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const fetch = require("node-fetch");

const port = 9000; // clients graphQL server port
const apiUrl = "http://localhost:4001"; // clients service baseURL

// @key is directive defines going to resolve on some key
/* fields defines on which key wants to resolve 
 Eg: in below example it Going to resolve clients by code field
*/
const typeDefs = gql`
  type Client @key(fields: "code") {
    code: String!
    logo: String!
  }

  extend type Query {
    clients: [Client]
  }
`;

const resolvers = {
  Client: {
    // make sure above key matches with your type eg: Client

    // __resolveReference helps to resolve from Client reference
    async __resolveReference({ code }, args) {
      const data = await fetch(`${apiUrl}/client/${code}`).then((res) =>
        res.json()
      );
      return data.data;
    },
  },
  Query: {
    async clients(_, { code }) {
      return await fetch(`${apiUrl}/client/${code}`).then((res) => {
        return res.data;
      });
    },
  },
};

// make sure build your schema with buildFederatedSchema
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port }).then(({ url }) => {
  console.log(`Clients gql server is ready at ${url}`);
});
