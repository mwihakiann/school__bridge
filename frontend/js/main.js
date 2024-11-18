// main.js
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Prepare the data to send in the request body
    const loginData = {
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Successful login, handle the response (you can redirect, store JWT, etc.)
        alert('Login successful!');
        // You can store the JWT token in localStorage or sessionStorage if needed
        localStorage.setItem('authToken', data.token);
        window.location.href = '/dashboard'; // Redirect to a dashboard or home page
      } else {
        // Display error message if login fails
        document.getElementById('loginErrorMessage').innerText = data.error;
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error during login:', error);
      document.getElementById('loginErrorMessage').innerText = 'An error occurred. Please try again.';
    }
  });
  