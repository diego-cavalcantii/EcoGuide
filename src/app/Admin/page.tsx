'use client'
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';

const Admin = () => {
  const [pendingPoints, setPendingPoints] = useState([]);

  useEffect(() => {
    fetchPendingPoints();
  }, []);

  const fetchPendingPoints = async () => {
    try {
      const response = await fetch('http://localhost:9090/astro/pending');
      if (!response.ok) {
        throw new Error('Failed to fetch pending points.');
      }
      const data = await response.json();
      setPendingPoints(data);
    } catch (error) {
      console.error('Error fetching pending points:', error);
    }
  };

  const handleAccept = async (name) => {
    try {
      const response = await fetch(`http://localhost:9090/astro/${name}/accept`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to accept point.');
      }
      // Remover o ponto de coleta aceito da lista
      setPendingPoints(pendingPoints.filter(({ name }) => name !== name));
    } catch (error) {
      console.error('Error accepting point:', error);
    }
  };

  const handleReject = async (name) => {
    try {
      const response = await fetch(`http://localhost:9090/astro/${name}/reject`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to reject point.');
      }
      // Remover o ponto de coleta rejeitado da lista
      setPendingPoints(pendingPoints.filter(({ name }) => name !== name));
    } catch (error) {
      console.error('Error rejecting point:', error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Lista de Pontos de Coleta Pendentes</h1>
        <ul>
          {pendingPoints.map(({ name, type }) => (
            <li key={name}>
              {name} - {type}
              <button onClick={() => handleAccept(name)}>Aceitar</button>
              <button onClick={() => handleReject(name)}>Rejeitar</button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Admin;
