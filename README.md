/appveyor/build/:user/:repo

<h1 allign="center">Apollo Federation POC</h1>

## Installation:

```
npm i && npm run server
````
:exclamation: May not work in first go due to `concurently`. :exclamation:

## Description:

We have

- Clients - Responsible for detail clients data.
- Users - Responsible for detail users data.
- TMP - Responsible for generating client code and user id. It is consuming User and Clients to get further details.

Each consists of their `service` and `graphql server`.
Hmmm then whats special about it?

It has `Gateway`.

So we will be using `gateway` only to reach our all servers, insted of hiting every individual server.

Thanks and Happy Coding :+1: :wink: