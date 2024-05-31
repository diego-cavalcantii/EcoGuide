'use client'
import React, { useState } from 'react';
import { TextField } from '../TextField/TextField';

const FormCollection = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleType = (event) => {
    setType(event.target.value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const url = "http://localhost:9090/astro";

    const payload = {
      name: name,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        return;
      }

      const data = await response.json();
      alert('Ponto de coleta adicionado com sucesso!')


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='form-collection'>
      <form onSubmit={handleRegister}>
        <div className='container-input'>
          <TextField
            id='name'
            label='Nome'
            type='text'
            onChange={handleName}
            required
            minLength={3}
          />
        </div>
        <div className='container-input'>
          <TextField
            id='type'
            label='Tipo'
            type='text'
            onChange={handleType}
            required
            minLength={3}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormCollection;
