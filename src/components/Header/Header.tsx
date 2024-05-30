'use client';
import React, { useEffect } from 'react'
import { waysList } from '@/mocks/waysList';
import Link from 'next/link';
import './Header.css';

interface waysListProps {
  text: string;
  link: string;
}

export default function Header() {
  const [ways, setWays] = React.useState<waysListProps[]>([])

  useEffect(() => {
    setWays(waysList)
  }, [])

  return (
    <header>
      <nav>
        <h1 className='logo'>EcoGuide</h1>
        <ul>
          {ways.map(({ text, link }, index) => (
            <li key={index} className='ways'><Link href={link}>{text}</Link></li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
