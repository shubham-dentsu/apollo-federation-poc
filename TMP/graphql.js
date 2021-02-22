const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");
const fetch = require("node-fetch");

const port = 7000; // TMP graphQL server port
const apiUrl = "http://localhost:4002"; // TMP service baseURL

/* 
 1) user and client type should match with it's type in it's GraphQL schema.
 Eg: in below example user type in it's schema is UM_User

 2) name should not get repeated so <APP_CODE>_<TYPE> TMP_Clients

 3) @key is directive defines going to resolve on some key
/* fields defines on which key wants to resolve 
 Eg: in below example it Going to resolve UM_User by id field
*/

const typeDefs = gql`
  type TMP_Clients {
    createdBy: ID!
    code: String!
    name: String!
    user: UM_User
    client: Client
  }

  extend type UM_User @key(fields: "id") {
    id: ID! @external
  }

  extend type Client @key(fields: "code") {
    code: String! @external
  }

  type Query {
    getClients: [TMP_Clients]
  }
`;

const resolvers = {
  TMP_Clients: {
    /* 
    it is just resolving user and client
    {__typename type, field} defines which type and which field, 
    field will be @key field
    */
    user: ({createdBy: id}, _) => ({__typename: "UM_User", id}),
    client: ({code}, _) => ({ __typename: "Client", code })
  },
  Query: {
    async getClients() {
      const data = await fetch(`${apiUrl}/listClients`).then(res => res.json());
      return data.data;
    }
  }
};

// make sure build your schema with buildFederatedSchema
const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen({ port }).then(({ url }) => {
  console.log(`Users service ready at ${url}`);
});