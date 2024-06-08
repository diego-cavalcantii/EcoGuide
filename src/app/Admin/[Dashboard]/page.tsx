'use client'
import './Dashboard.css';
import '../../../components/Header/Header.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import CardCollectAdmin from '@/components/CardCollectAdmin/CardCollectAdmin';
import Loading from '@/utils/Loading/Loading';
import Footer from '@/components/Footer/Footer';
import Layout from '@/components/Layout/Layout';


const Dashboard = () => {
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [pendingPoints, setPendingPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = './Login';
    }

    const handleBeforeUnload = () => {
      localStorage.removeItem('adminToken');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleBeforeUnload);


  }, []);

  const handlePendents = () => {
    setPending(true);
    fetchPendingPoints();
  }

  const fetchPendingPoints = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ponto_coleta/pending`);
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

  useEffect(() => {
    fetchCollectionPoints();
  }, [collectionPoints]);

  const handlePoints = () => {
    setPending(false);
    fetchCollectionPoints();
  }

  const fetchCollectionPoints = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ponto_coleta`);
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

  const handleAccept = async (idColeta: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ponto_coleta/${idColeta}/accept`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to accept point.');
      }
      setPendingPoints(pendingPoints.filter(({ idColeta }) => idColeta !== idColeta));
    } catch (error) {
      console.error('Error accepting point:', error);
    }
  };

  const handleReject = async (idColeta: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ponto_coleta/${idColeta}/reject`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Failed to reject point.');
      }
      setPendingPoints(pendingPoints.filter(({ idColeta }) => idColeta !== idColeta));
      handlePendents();
    } catch (error) {
      console.error('Error rejecting point:', error);
    }
  };

  const handleDelete = async (idColeta: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ponto_coleta/${idColeta}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete point.');
      }
      setCollectionPoints(collectionPoints.filter(({ idColeta }) => idColeta !== idColeta));
    } catch (error) {
      console.error('Error deleting point:', error);
    }
  };

  return (
    <div className='relative-dashboard'>
      <header className='header-admin'>
        <nav>
          <Link href={'/'}>
            <h1 className='logo'>EcoGuide</h1>
          </Link>
          <div>
            <button onClick={handlePoints}>Pontos de Coleta</button>
            <button onClick={handlePendents}>Pendentes</button>
          </div>
        </nav>
      </header>
      {loading ? (
        <Loading />
      ) : (pending ? (
        <main className="collection-list-dashboard">
          {pendingPoints.map(({ idColeta, name, type, imagemUrl, cep, logradouro, numero, bairro, cidade, uf, complemento, telefone }) => (
            <CardCollectAdmin key={idColeta}
              name={name}
              type={type}
              imagemUrl={imagemUrl}
              cep={cep}
              logradouro={logradouro}
              numero={numero}
              bairro={bairro}
              cidade={cidade}
              uf={uf}
              complemento={complemento}
              telefone={telefone}>
              <button onClick={() => handleReject(idColeta)} className='close'>delete</button>
              <button onClick={() => handleAccept(idColeta)} className='close accept'>aceitar</button>
            </CardCollectAdmin>
          ))}
        </main>
      ) : (loading ? (
        <Loading />
      ) : (
        <main className="collection-list-dashboard">
          {collectionPoints.map(({ idColeta, name, type, imagemUrl, cep, logradouro, numero, bairro, cidade, uf, complemento, telefone }) => (
            <CardCollectAdmin key={idColeta}
              name={name}
              type={type}
              imagemUrl={imagemUrl}
              cep={cep}
              logradouro={logradouro}
              numero={numero}
              bairro={bairro}
              cidade={cidade}
              uf={uf}
              complemento={complemento}
              telefone={telefone}>
              <button onClick={() => handleDelete(idColeta)} className='close'>delete</button>
            </CardCollectAdmin>
          ))}
        </main>
      )
      )
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;
