const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");


//middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

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
  res.render("dashboard", { user: "enes" });
});

app.post("/users/register", async (req, res) => {
  let { name, email, password, password2 } = req.body;

  let errors = [];

  if (!name || !email || !password) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Password must be at least 6 characters long" });
  }

  if (errors.length > 0) {
    res.render("register", { errors, name, email, password });
  } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const queryText = `SELECT * FROM users WHERE email = $1`;
      const queryValues = [email];

      const results = await pool.query(queryText, queryValues);

        const insertQueryText = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, password`;
        const insertQueryValues = [name, email, hashedPassword];

        const insertResults = await pool.query(
          insertQueryText,
          insertQueryValues
        );

        //req.flash("success_msg", "You are now registered. Please log in");
        res.redirect("/users/login");
      
  }
});


app.listen(5001, () => {
  console.log("port is run on port 5001");
});
