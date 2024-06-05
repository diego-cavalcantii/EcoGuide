'use client'
import React, { useState, useEffect } from 'react';
import { TextField } from '@/components/TextField/TextField';
import Layout from '@/components/Layout/Layout';
import '../Login/Login.css'

export default function Register() {
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
        window.location.href = '/Login'; // Redirect to AddCollects page
        alert('Cadastro efetuado')
      } else {
        setMessage('Username already exists');
      }
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  return (
    <Layout>
      <section className='container-login'>
        <article className='deep-ocean'>
          <h1>Seu lixo com destino <span style={{ fontWeight: 900, color: 'lightgreen' }}>certo!</span></h1>
        </article>
        <article className='container-form-login'>
          <div id='form-login'>
            <h2>Register</h2>
            <div>
            <TextField variant='input-login'
              id='name'
              label='Nome'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className='box-register'>
              <TextField variant='input-login'
                id='cpf'
                label='CPF'
                type="number"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <TextField variant='input-login'
                id='username'
                label='Username'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <TextField variant='input-login'
              id='email'
              label='Email'
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField variant='input-login'
              id='password'
              label='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className='box-buttons'>
              <button onClick={handleRegister}>Cadastre-se</button>
            </div>
            {message && <p>{message}</p>}
          </div>
        </article>
      </section>
    </Layout>
  );
};


