// api.js
export const registerUser = async (userData) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'An error occurred while registering');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API error:", error);  // Log API error in the console
      throw error;
    }
  };
  