'use client'
import './style.css';
import Layout from '@/components/Layout/Layout';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Imagens } from '@/components/imgs';
import Loading from '@/utils/Loading/Loading';


export default function Detalhe({ params: { id } }) {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollectionPoints();
  }, [detail]);

  const fetchCollectionPoints = async () => {
    try {
      const response = await fetch(`http://localhost:9090/ponto_coleta/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch collection points');
      }
      const data = await response.json();
      setDetail(data);
      setLoading(false); // Marca o carregamento como concluído
    } catch (error) {
      console.error('Error fetching collection points:', error);
      setLoading(false); // Em caso de erro, marca o carregamento como concluído para que a mensagem de erro seja exibida
    }
  }

  function closeDetail() {
    window.location.href = '/CollectPoints'
  };




  return (
    <Layout variant='relative-detail'>
      {loading ? (
        <Loading />
      ) : (
        <section className='section-detail'>
          <div className='name-collect'>
            <h1>{detail.name}</h1>
            <Image onClick={closeDetail} src={Imagens.xSolid} alt='close' width={30} height={30} />
          </div>
          <div className='grid-detail'>
            <Image src={detail.imagemUrl} alt={detail.name} width={400} height={300} />
            <div className='infos-collect'>
              <div className='icone-detail'>
                <Image src={Imagens.madeira} alt={detail.type} width={20} height={20} />
                <p className='type-collect'>{detail.type}</p>
              </div>
              <div className='icone-detail' >
                <Image src={Imagens.location} alt='location' width={20} height={20} />
                <div className='adress-detail'>
                  <p>{`CEP - ${detail.cep}`}</p>
                  <p>{`${detail.logradouro}, ${detail.numero}`}</p>
                  {detail.complemento && <p>{detail.complemento}</p>}
                  <p>{`${detail.bairro}, ${detail.cidade} - ${detail.uf}`}</p>
                </div>
              </div>
              <div className='icone-detail'>
                <Image src={Imagens.phone} alt='phone' width={20} height={20} />
                <p className='type-collect'>{detail.telefone}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
