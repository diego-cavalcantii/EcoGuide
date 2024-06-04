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

  const token = sessionStorage.getItem('token');
  const name = sessionStorage.getItem('username');


  useEffect(() => {
    console.log(name);

  }, [token, name]);


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
        <div className='menu-user'>
          {
            token ? (
              <div className='user'>
                <a>{name}</a>
                <span className='line-user' />
                <button className='logout' onClick={() => {
                  sessionStorage.clear();
                  window.location.href = '/';
                }}>Sair</button>
              </div>
            ) : (
              <Link href={'/pages/Login'}>
                <button className='login'>Login</button>
              </Link>
            )
          }
          <button className='bar' onClick={toogleMenu}>
            <Image src={Imagens.bars} alt='menu' width={20} height={20} />
          </button>
          <div className={isOpen ? 'menu-bar open' : 'menu-bar'}>
            <ul>
              {ways.map(({ text, link }, index) => (
                <Link href={link}>
                  <li key={index} className='ways'>{text}</li>
                </Link>
              ))}
              <button className='close' onClick={toogleMenu}>
                <Image src={Imagens.xSolid} alt='close' width={20} height={20} />
              </button>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
