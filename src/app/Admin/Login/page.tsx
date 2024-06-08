'use client'
import './LoginAdmin.css'
import { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { TextField } from '@/components/TextField/TextField';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('adminToken', token);
        alert('Login successful');
        window.location.href = './Dashboard'; // Redirect to Admin Dashboard page
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <>
      <Layout variant='relative-login-admin'>
        <section className='section-admin'>
          <article className='box-login-admin'>
            <h2>Olá Admin, <br />
              Bem vindo de volta</h2>
            <div>
              <TextField variant='input-admin'
                id='username'
                type="text"
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField variant='input-admin'
                id='password'
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className='button-login-admin' onClick={handleLogin}>Login</button>
          </article>
        </section>
      </Layout>
    </>
  );
};

export default Admin;
