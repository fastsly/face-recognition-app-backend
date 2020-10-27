const { response } = require("express");
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const fs = require("fs");
const cors = require("cors");
const knex = require("knex");
const app = express();
const register = require("./controllers/register");
const signin = require('./controllers/signin');
const { sign } = require("crypto");
const image = require('./controllers/image')
const profile = require('./controllers/profile')

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "bungeelaci",
    database: "face-recognition",
  },
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  //res.json(database.users)
  // fs.readFile('/', 'utf8', function (err,data) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //   });
  //send a file through http
  //   res.status(200).sendFile(__dirname+'/prezenta2020aprilie.xlsx')
});

app.post("/signin", (req, res) => {
  // bcrypt.compare("bacon", hash, function(err, res) {
  //     // res == true
  // });
  signin.handleSignIn(req,res, db, bcrypt)
  
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(res, req, db)
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db)
});

// // Load hash from your password DB.

// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3003, () => {
  console.log("Server is running!");
});
