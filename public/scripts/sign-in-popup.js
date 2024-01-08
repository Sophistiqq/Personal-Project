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
// popup animation  then remove atfter 4s
function animatePopup($message) {
  popupMessage.textContent = $message;
  popup.style.animation =
    "slide-down 4s cubic-bezier(0.645, 0.045, 0.355, 1) both";
  setTimeout(() => {
    popup.style.animation = "";
  }, 4000);
}
// animation: slide-down 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

// @keyframes slide-down {
//
//
const inputs = document.querySelectorAll("input");

const popup = document.querySelector(".popup");
const popupMessage = document.querySelector(".popup-message");

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
        window.location.href = "/products";
      } else {
        animatePopup(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

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

  // check if passwords match
  if (password !== confirmPassword) {
    animatePopup("Passwords do not match");
    return;
  }
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
        inputs.forEach((input) => {
          input.value = "";
        });
        animatePopup(data.message);
        signInForm.classList.add("show");
      } else {
        animatePopup(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
