import React from 'react'
import Image from 'next/image'
import './CardCollectAdmin.css'

interface CardCollectAdminProps {
  children?: React.ReactNode,
  idColeta?: number,
  name?: string,
  type?: string,
  imagemUrl: string,
  cep?: string,
  logradouro?: string,
  numero?: string,
  bairro?: string,
  cidade?: string,
  uf?: string,
  complemento?: string,
  telefone?: string,
}

export default function CardCollectAdmin({
  children,
  idColeta,
  name,
  type,
  imagemUrl,
  cep,
  logradouro,
  numero,
  bairro,
  cidade,
  uf,
  complemento,
  telefone,
}: CardCollectAdminProps) {
  return (
    <div key={idColeta} className='collection-point-dashboard'>
      <ul className='adress-collect-dashboard'>
        <li>{`CEP - ${cep}`}</li>
        <li>{`${logradouro} - ${numero}`}</li>
        <div className='city'>
          <li>{bairro}</li>
          <li>{`${cidade} - ${uf}`}</li>
        </div>
        <div className='city'>
          <li>{complemento ? complemento : null}</li>
          <li>{telefone}</li>
        </div>
      </ul>
      <div className='name-collect-dashboard'>
        <h3>{name}</h3>
        <p>{type}</p>
      </div>
      <Image src={imagemUrl} alt="imagem do ponto de coleta" width={180} height={200} />
      {children}
    </div >
  )
}
