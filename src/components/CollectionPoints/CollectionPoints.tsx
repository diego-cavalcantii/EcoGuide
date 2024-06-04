'use client'
import React, { useState, useEffect } from 'react';
import Title from '../Title/Title';
import './CollectionPoints.css';
import Image from 'next/image';

export default function CollectionPoints() {
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
    <section>
      <Title>Pontos de Coleta</Title>
      {loading ? (
        <p>Carregando...</p> // Mensagem de carregamento enquanto os pontos de coleta estão sendo buscados
      ) : (
        <div className="collection-points-list">
          {collectionPoints.length > 0 ? (
            collectionPoints.map(({ name, type, imagemUrl }) => (
              <div key={name} className="collection-point">
                <Image src={imagemUrl} alt="Collection point" width={100} height={100} />
                <h3>{name}</h3>
                <p>{type}</p>
              </div>
            ))
          ) : (
            <p>No collection points available.</p>
          )}
        </div>
      )}
    </section>
  );
}
