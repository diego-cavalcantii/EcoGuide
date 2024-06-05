'use client'
import Image from 'next/image'
import Layout from '@/components/Layout/Layout'
import React from 'react'
import RouteAddCollects from '@/components/Button/Button'
import Title from '@/components/Title/Title'
import { useState,useEffect } from 'react'
import './CollectPoint.css'

export default function CollectPoints() {
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollectionPoints() {
      try {
        const response = await fetch('http://localhost:9090/ponto_coleta');
        if (!response.ok) {
          throw new Error('Failed to fetch collection points');
        }
        const data = await response.json();
        setCollectionPoints(data);
        setLoading(false); // Marca o carregamento como concluído
      } catch (error) {
        console.error('Error fetching collection points:', error);
        setLoading(false); // Em caso de erro, marca o carregamento como concluído para que a mensagem de erro seja exibida
      }
    }

    fetchCollectionPoints();
  }, []);
  return (
    <Layout>
      <main className='main-collect-points'>
      <Title>Pontos de Coleta</Title>
      <section className='container-collect-points'>
      {loading ? (
        <p>Carregando...</p> // Mensagem de carregamento enquanto os pontos de coleta estão sendo buscados
      ) : (
        <div className="collection-points-list">
          {collectionPoints.length > 0 ? (
            collectionPoints.map(({ name, type, imagemUrl,cep,logradouro,numero,bairro,cidade,uf,complemento,telefone }) => (
              <div key={name} className="collection-point">
                <ul className='adress-collect'>
                  <li>{`CEP - ${cep}`}</li>
                  {/* <li>{`${logradouro} - ${numero}`}</li>
                  <div>
                  <li>{bairro}</li>
                  <li>{`${cidade} - ${uf}`}</li>
                  </div>
                  <li>{complemento ? complemento : null}</li>
                  <li>{telefone}</li> */}
                </ul>
                <div className='name-collect'>
                  <h3>{name}</h3>
                <div>
                  <span>coleta</span> <br />
                  <p>{type}</p>
                </div>
                </div>
                <Image className='img-collect' src={imagemUrl} alt="Collection point" width={380} height={330} /> 
              </div>
            ))
          ) : (
            <p>No collection points available.</p>
          )}
        </div>
      )}
    </section>
      <section className="container-add-collection">
        <h2>Existe algum ponto de coleta que não esteja aqui ? <br />
          Adicione no botão abaixo</h2>
        <RouteAddCollects>Adicionar ponto de coleta</RouteAddCollects>
      </section>
      </main>
    </Layout>
  )
}
