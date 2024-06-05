'use client'
import Layout from '@/components/Layout/Layout'
import React from 'react'
import { TextField } from '@/components/TextField/TextField'
import { useState } from 'react';
import Image from 'next/image';
import { Imagens } from '@/components/imgs';
import './Login.css'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePage = () => {
    window.location.href = './Register'; // Redirect to AddCollects page
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
    <Layout variant='vh'>
      <main className='container-login'>
        <Image src={Imagens.deepOcean} alt='fundo do mar'  />
    <div id='form-login'>
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
      </main>
    </Layout>
  );
}
