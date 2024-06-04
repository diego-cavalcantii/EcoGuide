'use client'
import React, { useState, useEffect } from 'react';

export default function UseRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handlePage() {
    window.location.href = '/pages/AddCollects'; // Redirect to AddCollects page

  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      handlePage();
    }
  }, [handlePage]);

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:9090/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        setMessage('Registration successful');
      } else {
        setMessage('Username already exists');
      }
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};


