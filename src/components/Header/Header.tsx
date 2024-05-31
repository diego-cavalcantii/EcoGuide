'use client';
import React, { useEffect } from 'react';
import { waysList } from '@/mocks/waysList';
import Link from 'next/link';
import './Header.css';
import { Imagens } from '../imgs';
import Image from 'next/image';


interface HeaderProps {
  variant?: string;

}

export default function Header({ variant }: HeaderProps) {
  const [ways, setWays] = React.useState(waysList);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setWays(waysList);
  }, []);

  const toogleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={variant}>
      <nav>
        <Link href={'/'}>
          <h1 className='logo'>EcoGuide</h1>
        </Link>
        <button className='bar' onClick={toogleMenu}>
          <Image src={Imagens.bars} alt='menu' width={20} height={20} />
        </button>
        <div className={isOpen ? 'menu-bar open' : 'menu-bar'}>
          <ul>
            {ways.map(({ text, link }, index) => (
              <li key={index} className='ways'><Link href={link}>{text}</Link></li>
            ))}
            <button className='close' onClick={toogleMenu}>
              <Image src={Imagens.xSolid} alt='close' width={20} height={20} />
            </button>
          </ul>
        </div>
      </nav>
    </header>
  );
}
