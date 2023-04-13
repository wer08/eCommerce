const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081",
    credentials: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to eCommerve application." });
});
const db = require("./models");
const Role = db.role;
const Item = db.item;
const User = db.user;
db.sequelize.sync({
  alter: true
}).then(() => {
    initial();
  });
  
  function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });

    Item.create({
      name: "randomItem1",
      description: "This is first random item",
      price: 55.67
    })
    Item.create({
      name: "randomItem2",
      description: "This is second random item",
      price: 12.54
    })
    User.create({
      username: 'wer08',
      email: 'wer08@mail.pl',
      password: 'M0rg0th&CO'
    })


  }

//routes
require('./routes/auth.routes')(app);
require('./routes/users.routes')(app);
require('./routes/user.routes')(app);
require('./routes/items.routes')(app);



// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});