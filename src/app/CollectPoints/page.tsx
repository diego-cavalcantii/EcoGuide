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
  }, []);


  const fetchCollectionPoints = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ponto_coleta`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

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

  function IdColeta(id: number) {
    window.location.href = `/CollectPoints/${id}`;
  }

  return (
    <Layout variant='relative-collect'>
      <main className='main-collect-points'>
        <h1>Pontos de Coleta</h1>
        {loading ? (
          <Loading />
        ) : (
          <section className="collection-points-list">
            {collectionPoints.length > 0 ? (
              collectionPoints.map(({ idColeta, name, type, imagemUrl, cep }) => (
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
          <h2>Existe algum ponto de coleta perto da sua casa que não esteja aqui ? <br />
            Adicione no botão abaixo</h2>
          <RouteAddCollects>Adicionar ponto de coleta</RouteAddCollects>
        </section>
      </main>
    </Layout>
  )
}
