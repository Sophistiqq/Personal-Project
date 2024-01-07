function $(selector) {
  return document.querySelector(selector);
}

function $id(id) {
  return document.getElementById(id);
}

const signInButton = $id("sign-in-button");
const signInPopup = $(".sign-in-popup");
const closeButton = $(".close-popup");
const revealSignIn = $(".reveal-sign-in");
const revealRegister = $(".reveal-register");
const revealConfirmRegister = $(".reveal-confirm-register");
const passwordSignIn = $("#password");
const passwordRegister = $("#reg-password");
const confirmPassword = $("#confirm-password");
const signInForm = $(".sign-in-form");
const registerButton = $id("register-button");
const backToSignIn = $(".back-to-sign-in");

registerButton.addEventListener("click", () =>
  signInForm.classList.remove("show"),
);
backToSignIn.addEventListener("click", () => signInForm.classList.add("show"));
signInButton.addEventListener("click", () =>
  signInPopup.classList.add("active"),
);
closeButton.addEventListener("click", () =>
  signInPopup.classList.remove("active"),
);

revealSignIn.addEventListener("click", () =>
  togglePasswordVisibility(passwordSignIn, revealSignIn),
);
revealRegister.addEventListener("click", () =>
  togglePasswordVisibility(passwordRegister, revealRegister),
);
revealConfirmRegister.addEventListener("click", () =>
  togglePasswordVisibility(confirmPassword, revealConfirmRegister),
);

function togglePasswordVisibility(passwordField, revealButton) {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    revealButton.classList.add("hide");
  } else {
    passwordField.type = "password";
    revealButton.classList.remove("hide");
  }
}

signInForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        window.location.href = '/products';
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// 	<form class="register-form">
// 			<h1>Register</h1>
// 			<div class="inputfield">
// 				<label for="first-name">First Name</label>
// 				<input type="text" name="first-name" id="first-name">
// 			</div>
// 			<div class="inputfield">
// 				<label for="last-name">Last Name</label>
// 				<input type="text" name="last-name" id="last-name">
// 			</div>
// 			<div class="inputfield">
// 				<label for="reg-username">Username</label>
// 				<input type="text" name="reg-username" id="reg-username">
// 			</div>
// 			<div class="inputfield">
// 				<label for="email">Email</label>
// 				<input type="email" name="email" id="email">
// 			</div>
// 			<div class="inputfield">
// 				<label for="reg-password">Password</label>
// 				<div class="password-input">
// 					<input type="password" name="reg-password" id="reg-password" class="reg-password">
// 					<button type="button" class="reveal reveal-register" title="Show Password"></button>
// 				</div>
// 			</div>
// 			<div class="inputfield">
// 				<label for="confirm-password">Confirm Password</label>
// 				<div class="password-input">
// 					<input type="password" name="confirm-password" id="confirm-password" class="confirm-password">
// 					<button type="button" class="reveal reveal-confirm-register" title="Show Password"></button>
// 				</div>
// 			</div>
// 			<div class="inputfield">
// 				<label for="phone-number">Phone Number</label>
// 				<input type="tel" name="phone-number" id="phone-number">
// 			</div>
// 			<button type="submit" class="register">Register</button>
//
// 			<button type="button" class="back-to-sign-in">Back to Sign in</button>
// 		</form>
// 	</div>
// </div>
//
//
//
//
// Create a script for this to handle the form above

const register_form = document.querySelector(".register-form");

register_form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("reg-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const phoneNumber = document.getElementById("phone-number").value;

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      phoneNumber,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        window.location.href = "/products";
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
