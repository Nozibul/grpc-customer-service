const express = require("express");
const bodyParser = require("body-parser");
const client = require("./client");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  client.GetAll(null, (err, data) => {
    if(!err) res.send(data.customers);
  })
});

app.post("/create", (req, res) => {
  let newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };

  client.Insert(newCustomer, (err, data) => {
    if(!err) res.send(data);
  })
});


app.post("/update", (req, res) => {
  let updatedCustomer = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
  };
  client.Update(updatedCustomer, (err, data) => {
    if(err) throw err;
    console.log(data);
    res.send({message: "Updated successfully"});
  })
});

app.post("/remove", (req, res) => {
  let removeCustomer = {
    id: req.body.id,
  };
  client.Remove(removeCustomer, (err, data) => {
    if(err) throw err;
    console.log(data);
    res.send({message: "Removed successfully"});
  })
});

// TODO: to expose rest call
// which internally call grpc server function using grpc client

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
