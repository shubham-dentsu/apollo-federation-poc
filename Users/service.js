const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// user endpoint returns detail user data
app.get("/user/:id", (req, res) => {
  res.status(200).json({
    data: data.filter((user) => user.id === req.params.id)[0],
  });
});

app.listen(4003, () => {
  console.log("users service is up and running on port 4003");
});

// dummy data
const data = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@domain.com",
  },
  {
    id: "2",
    name: "Mark Elison",
    email: "mark.elison@domain.com",
  },
];
