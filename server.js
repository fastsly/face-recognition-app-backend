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
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json('It is working!!')
});

app.post("/signin", (req, res) => { signin.handleSignIn(req,res, db, bcrypt) });

app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt); });

app.get("/profile/:id", (req, res) => { profile.handleProfile(res, req, db) });

app.put("/image", (req, res) => { image.handleImage(req, res, db) });

app.put("/imageurl", (req, res) => { image.handelApiCall(req, res) });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}!`);
});
