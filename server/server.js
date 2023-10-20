const express = require("express");
const app = express();
const { Pool } = require("./dbConfig");

//middleware
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users/register", (req, res) => {
  res.render("register");
});

app.get("/users/login", (req, res) => {
  res.render("login");
});

app.get("/users/dashboard", (req, res) => {
  res.render("dashboard", {user: 'enes'});
});

app.listen(5001, () => {
  console.log("port is run on port 5001");
});