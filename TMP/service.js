const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

/* 
  listClient endpoint returns clients
  but able to generate only specific data of client and user like id and code
*/
app.get("/listClients", (req, res) => {
  res.status(200).json({ data });
});

app.listen(4002, () => {
  console.log("TRD service is up and running on port 4002");
});

//dummy data
const data = [
  {
    code: "C1",
    name: "Client1",
    createdBy: "1",
  },
  {
    code: "C2",
    name: "Client2",
    createdBy: "2",
  },
];
