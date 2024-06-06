'use client'
import Layout from '@/components/Layout/Layout'
import React from 'react'
import { useEffect, useState } from 'react'
import { TextField } from '@/components/TextField/TextField'
import './AddCollects.css'

export default function AddCollects() {

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.location.href = './Login'; // Redirect to AddCollects page
    }
  }, []);

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
    <Layout variant='relative-points'>
      <section className='container-add-collect'>
        <article className='recycling'>
          <h1>Oceanos limpos</h1>
        </article>
        <article className='container-form-collection'>
          <form onSubmit={handleRegister} id='form-collect'>
            <h2>Ponto de Coleta</h2>
            <div className='box-form'>
              <div className="caixas-form-add-collect">
                <TextField variant='input-collect'
                  id='name'
                  label='Nome'
                  type='text'
                  onChange={handleName}
                  required
                  minLength={3}
                />
                <TextField variant='input-collect'
                  id='type'
                  label='Tipo'
                  type='text'
                  onChange={handleType}
                  placeholder='Ex: Coleta de óleo, Coleta de plástico, etc.'
                  required
                  minLength={3}
                />
              </div>
              <div className='caixas-form-add-collect'>
                <TextField variant='input-collect'
                  id='cep'
                  label='CEP'
                  type='text'
                  onChange={handleCep}
                  value={cep}
                  required
                  minLength={8}
                  maxLength={9}
                />
                <TextField variant='input-collect'
                  id='numero'
                  label='Numero'
                  type='text'
                  onChange={handleNumero}
                  value={numero}
                  required
                />
              </div>
              <TextField variant='input-collect'
                id='logradouro'
                label='Logradouro'
                type='text'
                onChange={handleLogradouro}
                value={logradouro}
                required
                readOnly
              />
              <div className='caixas-form-add-collect'>
                <TextField variant='input-collect'
                  id='cidade'
                  label='Cidade'
                  type='text'
                  onChange={handleCidade}
                  value={cidade}
                  required
                  readOnly
                />
                <TextField variant='input-collect'
                  id='uf'
                  label='UF'
                  type='text'
                  onChange={handleUf}
                  value={uf}
                  required
                  readOnly
                />
              </div>
              <div className='caixas-form-add-collect'>
                <TextField variant='input-collect'
                  id='bairro'
                  label='Bairro'
                  type='text'
                  onChange={handleBairro}
                  value={bairro}
                  required
                  readOnly
                />
                <TextField variant='input-collect'
                  id='complemento'
                  label='Complemento'
                  type='text'
                  onChange={handleComplemento}
                  value={complemento}
                />
              </div>
              <div className='caixas-form-add-collect'>
                <TextField variant='input-collect'
                  id='telefone'
                  label='Telefone'
                  type='text'
                  onChange={handleTelefone}
                  value={telefone}
                />
                <TextField variant='input-collect'
                  id='imagemUrl'
                  label='URL da imagem'
                  type='text'
                  placeholder='Ex: https://www.site.com/imagem.jpg'
                  onChange={handleImagemUrl}
                  value={imagemUrl}
                />
              </div>
            </div>
            <div className='box-button'>
              <button type="submit">Enviar</button>
            </div>
          </form>
        </article>
      </section>
    </Layout>

  )
};
