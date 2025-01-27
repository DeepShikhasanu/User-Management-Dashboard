import axios from 'axios';

//const apiUrl = 'https://jsonplaceholder.typicode.com/users';


// Fetch all users
export const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  };
  
  // Add a new user
  export const addUser = async (userData) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };
  
  // Delete a user
  export const deleteUser = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    });
    return response.ok; // Returns true if the deletion was successful
  };
  