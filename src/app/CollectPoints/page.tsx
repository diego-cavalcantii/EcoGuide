'use client'
import './CollectPoint.css'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Layout from '@/components/Layout/Layout'
import RouteAddCollects from '@/components/Button/Button'
import Title from '@/components/Title/Title'
import Loading from '@/utils/Loading/Loading'

export default function CollectPoints() {
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollectionPoints();
  }, [collectionPoints]);

  const fetchCollectionPoints = async () => {
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

  function IdColeta(params) {
    window.location.href = `CollectPoints/${params}`

  }

  return (
    <Layout variant='relative-collect'>
      <main className='main-collect-points'>
        <h1>Pontos de Coleta</h1>
        {loading ? (
          <Loading /> // Mensagem de carregamento enquanto os pontos de coleta estão sendo buscados
        ) : (
          <section className="collection-points-list">
            {collectionPoints.length > 0 ? (
              collectionPoints.map(({ idColeta, name, type, imagemUrl, cep, logradouro, numero, bairro, cidade, uf, complemento, telefone }) => (
                <div key={idColeta} className="collection-point">
                  <div className='box-infos-collect'>
                    <div className='name-collect'>
                      <h3>{name}</h3>
                      <p>{type}</p>
                      <p>{`CEP - ${cep}`}</p>
                    </div>
                    <div className='more-infos'>
                      <button onClick={() => IdColeta(idColeta)}>+</button>
                    </div>
                  </div>
                  <Image className='img-collect' src={imagemUrl} alt="Collection point" width={300} height={230} />
                </div>
              ))
            ) : (
              <p>No collection points available.</p>
            )}
          </section>
        )}
        <section className="container-add-collection">
          <h2>Existe algum ponto de coleta que você que não esteja aqui ? <br />
            Adicione no botão abaixo</h2>
          <RouteAddCollects>Adicionar ponto de coleta</RouteAddCollects>
        </section>
      </main>
    </Layout>
  )
}
