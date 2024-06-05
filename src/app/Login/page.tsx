'use client'
import React from 'react'
import { TextField } from '@/components/TextField/TextField'
import { useState } from 'react';
import './Login.css'
import Header from '@/components/Header/Header';

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
    <div className='vh'>
      <Header variant='bg-transparent text-white' />
      <main className='container-login'>
        <section className='deep-ocean'>
          <h1>Seu lixo com destino <span style={{ fontWeight: 900, color: 'lightgreen' }}>certo!</span></h1>
        </section>
        <section className='container-form-login'>
          <article id='form-login'>
            <h2>Login</h2>
            <div className='box-login'>
              <TextField variant='input-login'
                id='username'
                label='Username'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField variant='input-login'
                id='password'
                label='Password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className='box-buttons'>
              <button onClick={handleLogin}>Login</button>
              <span />
              <button onClick={handlePage}>Cadastre-se</button>
            </div>
            {message && <p>{message}</p>}
          </article>
        </section>
      </main>
    </div>
  );
}
