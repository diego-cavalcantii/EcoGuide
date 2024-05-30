'use client'
import React, { useEffect } from 'react'
import './WhyDiscard.css';
import { whyDiscard } from '@/mocks/infos';
import Image from 'next/image';
import Title from '../Title/Title'


export default function Discard() {
  const [discard, setDiscard] = React.useState(whyDiscard)

  useEffect(() => {
    setDiscard(whyDiscard)
  }, [])

  return (
    <section>
      {discard.map(({ title, text, image }, index) => (
        <article className='why-discard' key={index}>
          <Title>{title}</Title>
          <div className='firts-paragraphs'>
            <p>{text[0]}</p>
            <p>{text[1]}</p>
          </div>
          <div className='second-paragraphs'>
            <p>{text[2]}</p>
            <p>{text[3]}</p>
          </div>
          <Image className='discard-image' src={image} alt='recycling' width={500} height={333} />
        </article>
      ))}
    </section>
  )
}
