'use client'
import React, { useState, useEffect } from 'react';
import { TextField } from '../TextField/TextField';

export default function UseRegister() {
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');



  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:9090/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cpf, name, username, email, password })
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
      <TextField
        id='cpf'
        label='CPF'
        type="number"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />
      <TextField
        id='name'
        label='Nome'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id='username'
        label='Username'
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        id='email'
        label='Email'
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id='password'
        label='Password'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
};


