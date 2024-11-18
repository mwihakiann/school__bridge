import { registerUser } from './api.js'; 

document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Retrieve input values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  // Basic validation
  if (!name || !email || !password || !role) {
    alert("All fields are required!");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  // Prepare user data
  const userData = { name, email, password, role };

  try {
    // Make API request to register the user
    const response = await registerUser(userData);

    // Handle server response
    if (response.success) {
      alert(response.message || "Registration successful!");
      window.location.href = "/login"; // Redirect to login page on success
    } else {
      alert(response.message || "Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Error in registration:", error);
    alert("An error occurred during registration. Please check your network or server.");
  }
});
