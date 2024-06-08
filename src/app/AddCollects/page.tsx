'use client'
import './AddCollects.css'
import '../../components/Button/Button.css'
import { useEffect, useState } from 'react'
import Layout from '@/components/Layout/Layout'
import { TextField } from '@/components/TextField/TextField'
import RequireAuth from '@/utils/RequireAuth'

export default function AddCollects() {
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


  const handleCep = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/ponto_coleta`;

    const collect = {
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
        body: JSON.stringify(collect),
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
    <RequireAuth>
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
                    label='Nome do Ponto de Coleta'
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={3}
                  />
                  <TextField variant='input-collect'
                    id='type'
                    label='Tipo de Coleta'
                    type='text'
                    onChange={(e) => setType(e.target.value)}
                    placeholder='Ex: Papel, Eletrônico, etc.'
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
                    minLength={8}
                    maxLength={9}
                    required
                  />
                  <TextField variant='input-collect'
                    id='numero'
                    label='Numero'
                    type='text'
                    onChange={(e) => setNumero(e.target.value)}
                    value={numero}
                    required
                  />
                </div>
                <TextField variant='input-collect'
                  id='logradouro'
                  label='Logradouro'
                  type='text'
                  onChange={(e) => setLogradouro(e.target.value)}
                  value={logradouro}
                  required
                  readonly
                />
                <div className='caixas-form-add-collect'>
                  <TextField variant='input-collect'
                    id='cidade'
                    label='Cidade'
                    type='text'
                    onChange={(e) => setCidade(e.target.value)}
                    value={cidade}
                    required
                    readonly
                  />
                  <TextField variant='input-collect'
                    id='uf'
                    label='UF'
                    type='text'
                    onChange={(e) => setUf(e.target.value)}
                    value={uf}
                    required
                    readonly
                  />
                </div>
                <div className='caixas-form-add-collect'>
                  <TextField variant='input-collect'
                    id='bairro'
                    label='Bairro'
                    type='text'
                    onChange={(e) => setBairro(e.target.value)}
                    value={bairro}
                    required
                    readonly
                  />
                  <TextField variant='input-collect'
                    id='complemento'
                    label='Complemento'
                    type='text'
                    onChange={(e) => setComplemento(e.target.value)}
                    value={complemento}
                  />
                </div>
                <div className='caixas-form-add-collect'>
                  <TextField variant='input-collect'
                    id='telefone'
                    label='Telefone'
                    type='text'
                    onChange={(e) => setTelefone(e.target.value)}
                    value={telefone}
                    minLength={8}
                    maxLength={11}
                  />
                  <TextField variant='input-collect'
                    id='imagemUrl'
                    label='URL da imagem'
                    type='text'
                    placeholder='Ex: https://www.site.com/imagem.jpg'
                    onChange={(e) => setImagemUrl(e.target.value)}
                    value={imagemUrl}
                    maxLength={255}
                  />
                </div>
              </div>
              <div className='box-button'>
                <button className='button-main' type="submit">Enviar</button>
              </div>
            </form>
          </article>
        </section>
      </Layout>
    </RequireAuth>

  )
};
