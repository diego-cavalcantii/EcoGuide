'use client'
import React from 'react'
import './Login.css'
import '../../components/Button/Button.css'
import { TextField } from '@/components/TextField/TextField'
import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://abb4-2804-14c-181-9b71-315a-e6cd-40bb-4f89.ngrok-free.app/user/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const token = await response.text();
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('username', username);
        alert('Login successful');
        window.location.href = '/';
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <Layout>
      <section className='container-login'>
        <article className='deep-ocean'>
          <h1>Seu lixo com destino  certo!</h1>
        </article>
        <article className='container-form-login'>
          <div id='form-login'>
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
              <button className='button-main' onClick={handleLogin}>Login</button>
              <span style={{ border: '1px dashed #333', width: '95%', margin: '0 auto' }} />
              <Link className='button-main' href={'./Register'}>Cadastre-se
              </Link>
            </div>
          </div>
        </article>
      </section>
    </Layout>
  );
}
