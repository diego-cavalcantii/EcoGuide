'use client'
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';

const Dashboard = () => {
  const [pendingPoints, setPendingPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = './Admin';
    }
  }, []);

  useEffect(() => {
    fetchPendingPoints();
  }, []);

  const fetchPendingPoints = async () => {
    try {
      const response = await fetch('http://localhost:9090/ponto_coleta/pending');
      if (!response.ok) {
        throw new Error('Failed to fetch pending points.');
      }
      const data = await response.json();
      setPendingPoints(data);
      setLoading(false); // Marca o carregamento como concluído
    } catch (error) {
      console.error('Error fetching pending points:', error);
      setLoading(false); // Em caso de erro, marca o carregamento como concluído para que a mensagem de erro seja exibida
    }
  };

  const handleAccept = async (idColeta) => {
    try {
      const response = await fetch(`http://localhost:9090/ponto_coleta/${idColeta}/accept`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to accept point.');
      }
      // Remover o ponto de coleta aceito da lista
      setPendingPoints(pendingPoints.filter(({ idColeta }) => idColeta !== idColeta));
    } catch (error) {
      console.error('Error accepting point:', error);
    }
  };

  const handleReject = async (idColeta) => {
    try {
      const response = await fetch(`http://localhost:9090/ponto_coleta/${idColeta}/reject`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to reject point.');
      }
      // Remover o ponto de coleta rejeitado da lista
      setPendingPoints(pendingPoints.filter(({ idColeta }) => idColeta !== idColeta));
    } catch (error) {
      console.error('Error rejecting point:', error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Lista de Pontos de Coleta Pendentes</h1>
        {loading ? (
          <p>Carregando...</p> // Mensagem de carregamento enquanto os pontos de coleta pendentes estão sendo buscados
        ) : (
          <ul>
            {pendingPoints.map(({ idColeta, name, type }) => (
              <li key={idColeta}>
                {name} - {type}
                <button onClick={() => handleAccept(idColeta)}>Aceitar</button>
                <button onClick={() => handleReject(idColeta)}>Rejeitar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
