import React from 'react'
import { useEffect } from 'react';

interface RequireAuthProps {
  children : React.ReactNode
}

export default function RequireAuth({children}:RequireAuthProps) {
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.location.href = './Login'; // Redirect to AddCollects page
    }
  }, []);

  return (
    <>
    {children}
    </>
  )
}
