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

// create a  route for  thiss
// 	<form action="/register" class="register-form">
// 		<h1>Register</h1>
// 		<div class="inputfield">
// 			<label for="first-name">First Name</label>
// 			<input type="text" name="first-name" id="first-name">
// 		</div>
// 		<div class="inputfield">
// 			<label for="last-name">Last Name</label>
// 			<input type="text" name="last-name" id="last-name">
// 		</div>
// 		<div class="inputfield">
// 			<label for="reg-username">Username</label>
// 			<input type="text" name="reg-username" id="reg-username">
// 		</div>
// 		<div class="inputfield">
// 			<label for="email">Email</label>
// 			<input type="email" name="email" id="email">
// 		</div>
// 		<div class="inputfield">
// 			<label for="reg-password">Password</label>
// 			<div class="password-input">
// 				<input type="password" name="reg-password" id="reg-password" class="reg-password">
// 				<button type="button" class="reveal reveal-register" title="Show Password"></button>
// 			</div>
// 		</div>
// 		<div class="inputfield">
// 			<label for="confirm-password">Confirm Password</label>
// 			<div class="password-input">
// 				<input type="password" name="confirm-password" id="confirm-password" class="confirm-password">
// 				<button type="button" class="reveal reveal-confirm-register" title="Show Password"></button>
// 			</div>
// 		</div>
// 		<div class="inputfield">
// 			<label for="phone-number">Phone Number</label>
// 			<input type="tel" name="phone-number" id="phone-number">
// 		</div>
// 		<button type="submit" class="register">Register</button>
//
// 		<button type="button" class="back-to-sign-in">Back to Sign in</button>
// 	</form>
// </div>
//

app.post("/register", (req, res) => {
  const { firstName, lastName, username, email, password, phoneNumber } = req.body;

  const query = "INSERT INTO users (first_name, last_name, username, email, password, phone_number) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [firstName, lastName, username, email, password, phoneNumber],
    (err, results) => {
      if (err) {
        console.error("Database error", err);
        return res.json({ success: false, message: "Internal server error" });
      }

      res.json({
        success: true,
        message: "User created",
      });
    },
  );
});
