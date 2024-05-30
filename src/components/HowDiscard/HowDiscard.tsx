'use client'
import React, { useEffect, useRef, useState } from 'react'
import './HowDiscard.css';
import { howDiscard } from '@/mocks/infos';
import Title from '@/components/Title/Title';
import Image from 'next/image';

export default function HowDiscard() {
  const [discard, setDiscard] = useState(howDiscard);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const infoRef = useRef<HTMLDivElement>(null); // Referência à seção de informações

  useEffect(() => {
    setDiscard(howDiscard);
  }, []);

  function handleClick(id: number) {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
      // Rola para a seção de informações quando um item é selecionado
      setTimeout(() => {
        infoRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Pequeno atraso para garantir que o estado foi atualizado
    }
  }

  const selectedItem = discard.find(item => item.id === selectedId);

  return (
    <section className='container-how-discard' id='reciclagem'>
      <Title>Como descartar de forma correta?</Title>
      <article className='how-discord'>
        {discard.map(({ title, image, id }) => (
          <button onClick={() => handleClick(id)} className='box-recycling' key={id}>
            <Image src={image} alt={title} width={80} height={80} />
            <p>{title}</p>
          </button>
        ))}
      </article>
      {selectedId !== null && selectedItem && (
        <article key={selectedId} className='text-discord' ref={infoRef}> {/* Referência adicionada aqui */}
          <Title>{selectedItem.title}</Title>
          <p>{selectedItem.text}</p>
          {selectedItem.image && (
            <Image src={selectedItem.image} alt={selectedItem.title} width={400} height={300} />
          )}
        </article>
      )}
    </section>
  );
}
