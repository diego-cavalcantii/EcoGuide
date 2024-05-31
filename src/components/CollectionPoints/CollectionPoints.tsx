'use client'
import React, { useState, useEffect } from 'react';
import Title from '../Title/Title';
import './CollectionPoints.css';

export default function CollectionPoints() {
  const [collectionPoints, setCollectionPoints] = useState([]);

  useEffect(() => {
    async function fetchCollectionPoints() {
      try {
        const response = await fetch('http://localhost:9090/astro');
        if (!response.ok) {
          throw new Error('Failed to fetch collection points');
        }
        const data = await response.json();
        setCollectionPoints(data);
      } catch (error) {
        console.error('Error fetching collection points:', error);
      }
    }

    fetchCollectionPoints();
  }, [collectionPoints]);

  return (
    <section id='pontos-de-coleta'>
      <Title>Pontos de Coleta</Title>
      <div className="collection-points-list">
        {collectionPoints.length > 0 ? (
          collectionPoints.map(({ name, type }) => (
            <div key={name} className="collection-point">
              <h3>{name}</h3>
              <p>{type}</p>
            </div>
          ))
        ) : (
          <p>No collection points available.</p>
        )}
      </div>
    </section>
  );
}
