'use client'
import React, { useEffect, useState } from 'react'
import './RouteAddCollects.css'


interface ButtonProps {
  children?: string
}

export default function Button({ children }: ButtonProps) {

  const token = sessionStorage.getItem('token');

  const handleAddCollect = () => {
    if (!token) { window.location.href = 'pages/Login'; }
    else { window.location.href = 'pages/AddCollects'; }
  };

  return (
    <button onClick={handleAddCollect} className='add-collection'>{children}</button>
  )
}
