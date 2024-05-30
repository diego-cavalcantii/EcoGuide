import React from 'react'
import './Title.css';

interface TitleProps {
  children: React.ReactNode
}

export default function Title({ children }: TitleProps) {
  return (
    <h2 className='title'>{children}</h2>
  )
}
