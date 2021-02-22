const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// client endpoint returns detail client data 
app.use("/client/:code", (req, res) => {
  res.status(200).json({
    data: clients.filter((client) => client.code === req.params.code)[0],
  });
});

app.listen(4001, () => {
  console.log("clients is up and running on port 4001");
});

// dummy data
const clients = [
  {
    code: "C1",
    logo:
      "https://i.picsum.photos/id/0/200/200.jpg?hmac=RZmZI0kb9l_aRWHFyOZUGyc8xsyV30HOJX8a4wuHWkA",
  },
  {
    code: "C2",
    logo:
      "https://i.picsum.photos/id/0/200/200.jpg?hmac=RZmZI0kb9l_aRWHFyOZUGyc8xsyV30HOJX8a4wuHWkA",
  },
];