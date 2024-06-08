'use client';
import './style.css';
import { Imagens } from '@/components/imgs';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout/Layout';
import Loading from '@/utils/Loading/Loading';

interface DetailProps {
  params: {
    id: string;
  };
}

interface DetailData {
  name: string;
  imagemUrl: string;
  type: string;
  telefone: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}

const Detalhe: React.FC<DetailProps> = ({ params: { id } }) => {
  const [detail, setDetail] = useState<DetailData>(null as any as DetailData);
  const [clima, setClima] = useState<WeatherData>(null as any as WeatherData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollectionPoints();
  }, [id]);
  useEffect(() => {
    if (detail && detail.cep) {
      fetchLatLngAndWeather(detail.cep);
    }
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
  };

  const fetchLatLngAndWeather = async (cep: string) => {
    try {
      // Fetch latitude and longitude using the CEP
      const cepResponse = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
      if (!cepResponse.ok) {
        throw new Error('Failed to fetch location data');
      }
      const cepData = await cepResponse.json();
      const { lat, lng } = cepData;

      // Fetch weather data using the latitude and longitude
      const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=626134ecb5b009e6383d175d3fc17150&units=metric&lang=pt`);
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const weatherData = await weatherResponse.json();
      setClima(weatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  function closeDetail() {
    window.location.href = '/CollectPoints';
  }

  return (
    <Layout variant='relative-detail'>
      {loading ? (
        <Loading />
      ) : (
        <section className='section-detail'>
          <div className='name-collect'>
            <h1>{detail?.name}</h1>
            <Image onClick={closeDetail} src={Imagens.xSolid} alt='close' width={30} height={30} />
          </div>
          <div className='grid-detail'>
            <Image src={detail.imagemUrl} alt={detail.name} width={400} height={300} />
            <div className='infos-geral'>
              <div className='infos-collect'>
                <div className='icone-detail'>
                  <Image src={Imagens.madeira} alt={detail.type} width={20} height={20} />
                  <p className='type-collect'>{detail.type}</p>
                </div>


                <div className='icone-detail'>
                  <Image src={Imagens.phone} alt='phone' width={20} height={20} />
                  <p className='type-collect'>{detail.telefone}</p>
                </div>
                {clima && (
                  <div className='weather'>
                    <h2>Informações do Clima</h2>
                    <div>
                      <p>Temperatura:  {clima.main.temp}°C</p>
                      <p>Descrição:  {clima.weather[0].description}</p>
                      <p>Umidade:  {clima.main.humidity}%</p>
                    </div>
                  </div>
                )}
              </div>



              <div className='icone-adress'>
                <Image src={Imagens.location} alt='location' width={20} height={20} />
                <div className='adress-detail'>
                  <p>{`${detail.logradouro}, ${detail.numero}`}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>{`CEP - ${detail.cep}`}</p>
                    {detail?.complemento && <p>{detail.complemento}</p>}
                  </div>
                  <p>{`${detail.bairro}, ${detail.cidade} - ${detail.uf}`}</p>
                </div>
              </div>




            </div>
          </div>

        </section>
      )}
    </Layout>
  );
}

export default Detalhe;