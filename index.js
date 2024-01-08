const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// Import the database config
const db = require("./configs/db.js");

app.listen(8080, () => {
  console.log("App is in http://localhost:8080");
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
// Homepage  Router
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/products", (req, res) => {
  res.render("products");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Database error", err);
      return res.json({ success: false, message: "Internal server error" });
    }

    res.json({
      success: results.length > 0,
      message: results.length > 0 ? "Login successful" : "Invalid credentials",
    });
  });
});

app.post("/register", (req, res) => {
  const { firstName, lastName, username, email, password, phoneNumber } =
    req.body;

  const query =
    "INSERT INTO users (first_name, last_name, username, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [firstName, lastName, username, email, password, phoneNumber],
    (err, results) => {
      // if User already exists
      if (err && err.code === "ER_DUP_ENTRY") {
        return res.json({
          success: false,
          message: "User already exists",
        });
      }
      // if there is any other error
      if (err) {
        console.error("Database error", err);
        return res.json({ success: false, message: "Internal server error" });
      }
      // if everything is successful
      res.json({
        success: true,
        message: "User created",
      });
    },
  );
});
