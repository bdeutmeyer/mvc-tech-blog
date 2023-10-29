// const router = require('express').Router();

const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);



// const signUpBtn = document.getElementById('signUpInstead');
// signUpBtn.addEventListener('click', function () {
//   console.log('button clicked')
//   router.route('/api/user/signup', (req, res => {
//     res.render('signup');
//     return;
//   }))
// });


