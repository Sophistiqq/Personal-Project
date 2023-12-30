
	function $(selector) {
		return document.querySelector(selector);
	}

	function $id(id) {
		return document.getElementById(id);
	}

	const signInButton = $id('sign-in-button');
	const signInPopup = $('.sign-in-popup');
	const closeButton = $('.close-popup');
	const revealSignIn = $('.reveal-sign-in');
	const revealRegister = $('.reveal-register');
	const revealConfirmRegister = $('.reveal-confirm-register');
	const passwordSignIn = $('#password');
	const passwordRegister = $('#reg-password');
	const confirmPassword = $('#confirm-password');
	const signInForm = $('.sign-in-form');
	const registerButton = $id('register-button');
	const backToSignIn = $('.back-to-sign-in');

	registerButton.addEventListener('click', () => signInForm.classList.remove('show'));
	backToSignIn.addEventListener('click', () => signInForm.classList.add('show'));
	signInButton.addEventListener('click', () => signInPopup.classList.add('active'));
	closeButton.addEventListener('click', () => signInPopup.classList.remove('active'));

	revealSignIn.addEventListener('click', () => togglePasswordVisibility(passwordSignIn, revealSignIn));
	revealRegister.addEventListener('click', () => togglePasswordVisibility(passwordRegister, revealRegister));
	revealConfirmRegister.addEventListener('click', () => togglePasswordVisibility(confirmPassword, revealConfirmRegister));

	function togglePasswordVisibility(passwordField, revealButton) {
		if (passwordField.type === 'password') {
			passwordField.type = 'text';
			revealButton.classList.add('hide');
		} else {
			passwordField.type = 'password';
			revealButton.classList.remove('hide');
		}
	}


  signInForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password})
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // window.location.href = '/products';
        alert(data.message)
      } else {
        alert(data.message)
      }
    })
    .catch(error => {
      console.error('Error:',error)
    })
  });
