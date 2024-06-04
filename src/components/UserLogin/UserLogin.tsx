'use client'
import React, { useState } from 'react';
import { TextField } from '../TextField/TextField';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePage = () => {
    window.location.href = '/pages/Register'; // Redirect to AddCollects page
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:9090/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const token = await response.text();
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('username', username);
        setMessage('Login successful');
        console.log(token);
        console.log(username);


        window.location.href = '/'; // Redirect to AddCollects page
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <TextField
        id='username'
        label='Username'
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        id='password'
        label='Password'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handlePage}>Cadastre-se</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
