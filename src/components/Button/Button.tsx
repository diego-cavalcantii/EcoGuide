'use client'
import './Button.css'
import React from 'react'


interface ButtonProps {
  children?: string
}



export default function RouteAddCollects({ children }: ButtonProps) {
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token != null) {
      setToken(token);
    }
  }, []);



  const handleAddCollect = () => {
    if (!token) { window.location.href = './Login'; }
    else { window.location.href = './AddCollects'; }
  };

  return (
    <button onClick={handleAddCollect} className='add-collection'>{children}</button>
  )
}

