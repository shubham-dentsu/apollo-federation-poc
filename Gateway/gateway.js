const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const port = 4000;
/* apollo gateway 
 serviceList consists with GraphQL server URL's
*/
const gateway = new ApolloGateway({
  serviceList: [
    { name: "users", url: "http://localhost:5000" },
    { name: "clients", url: "http://localhost:9000" },
    { name: "traders", url: "http://localhost:7000" },
  ]
});

const server = new ApolloServer({
    gateway,
    subscriptions: false
  });
  
  server.listen({ port }).then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
  
  