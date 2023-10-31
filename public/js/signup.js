console.log("hello");
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // document.location.replace('/');
        console.log('Signed up')
      } else {
        alert('Failed to sign up.');
      }
    }
  };

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

  // document.getElementById('logInInstead').addEventListener('click', function () {
  //   // window.location.href = '/login';
  //   console.log('rerouting to login')
  //   return;
  // });
