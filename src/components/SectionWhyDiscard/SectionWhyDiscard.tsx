'use client'
import React, { useEffect } from 'react'
import './SectionWhyDiscard.css';
import { whyDiscard } from '@/mocks/infos';
import Image from 'next/image';
import Title from '../Title/Title'


export default function SectionWhyDiscard() {
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
          </div>
          <p className='third-paragraphs'>{text[3]}</p>
          <div className='discard-image' >
            {image.map((image, index) => (
              <Image key={index} src={image} alt='recycling' width={400} height={300} />
            ))}
          </div>
        </article>
      ))
      }
    </section >
  )
}
