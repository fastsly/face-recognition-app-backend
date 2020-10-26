const { response } = require("express");
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const fs = require("fs");
const cors = require("cors");
const knex = require("knex");
const app = express();
const register = require("./controllers/register");

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
  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => {
            res.status(200).json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("User doesnt exist or wrong password");
      }
    })
    .catch((err) =>
      res.status(400).json("User doesnt exist or wrong password")
    );
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      //console.log(user)
      if (user.length) {
        res.status(200).json(user[0]);
      } else {
        res.status(400).json("User not found");
      }
    })
    .catch((err) => res.status(400).json("An unknown error has occured!"));
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.status(200).json(entries[0]);
    })
    .catch((err) => {
      res.status(400).json("Unable to get entries");
    });
});

// // Load hash from your password DB.

// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3003, () => {
  console.log("Server is running!");
});
