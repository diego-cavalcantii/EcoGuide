'use client'
import React, { useState } from 'react';
import { TextField } from '../TextField/TextField';

const FormCollection = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [complemento, setComplemento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');


  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleType = (event) => {
    setType(event.target.value);
  };

  const handleCep = async (event) => {
    const cepValue = event.target.value;
    setCep(cepValue);

    if (cepValue.length >= 8) { // Assuming Brazilian CEP format
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
        if (!response.ok) {
          throw new Error('CEP não encontrado');
        }
        const data = await response.json();
        setLogradouro(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setUf(data.uf);


      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const handleLogradouro = (event) => {
    setLogradouro(event.target.value);
  };
  const handleNumero = (event) => {
    setNumero(event.target.value);
  };

  const handleBairro = (event) => {
    setBairro(event.target.value);
  };

  const handleCidade = (event) => {
    setCidade(event.target.value);
  };
  const handleUf = (event) => {
    setUf(event.target.value);
  };
  const handleComplemento = (event) => {
    setComplemento(event.target.value);
  };
  const handleTelefone = (event) => {
    setTelefone(event.target.value);
  };
  const handleImagemUrl = (event) => {
    setImagemUrl(event.target.value);
  };


  const handleRegister = async (event) => {
    event.preventDefault();
    const url = "http://localhost:9090/ponto_coleta"; // Aqui estou consumindo a API que criei

    const payload = {
      name: name,
      type: type,
      cep: cep,
      logradouro: logradouro,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      uf: uf,
      complemento: complemento,
      telefone: telefone,
      imagemUrl: imagemUrl,
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
      alert('Ponto de coleta adicionado com sucesso!');

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
        <div className='container-input'>
          <TextField
            id='cep'
            label='CEP'
            type='text'
            onChange={handleCep}
            value={cep}
            required
            minLength={8}
            maxLength={9}
          />
        </div>
        <div className='container-input'>
          <TextField
            id='logradouro'
            label='Logradouro'
            type='text'
            onChange={handleLogradouro}
            value={logradouro}
            required
            readOnly
          />
        </div>
        <div className='container-input'>
          <TextField
            id='numero'
            label='Numero'
            type='text'
            onChange={handleNumero}
            value={numero}
            required
          />
        </div>
        <div className='container-input'>
          <TextField
            id='bairro'
            label='Bairro'
            type='text'
            onChange={handleBairro}
            value={bairro}
            required
            readOnly
          />
        </div>
        <div className='container-input'>
          <TextField
            id='cidade'
            label='Cidade'
            type='text'
            onChange={handleCidade}
            value={cidade}
            required
            readOnly
          />
        </div>
        <div className='container-input'>
          <TextField
            id='uf'
            label='UF'
            type='text'
            onChange={handleUf}
            value={uf}
            required
            readOnly
          />
        </div>
        <div className='container-input'>
          <TextField
            id='complemento'
            label='Complemento'
            type='text'
            onChange={handleComplemento}
            value={complemento}
          />
        </div>
        <div className='container-input'>
          <TextField
            id='telefone'
            label='Telefone'
            type='text'
            onChange={handleTelefone}
            value={telefone}
          />
        </div>
        <div className='container-input'>
          <TextField
            id='imagemUrl'
            label='URL da imagem'
            type='text'
            onChange={handleImagemUrl}
            value={imagemUrl}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default FormCollection;
