'use client'
import Footer from '@/components/Footer/Footer'
import FormAddCollect from '@/components/FormAddCollect/FormAddCollect'
import Header from '@/components/Header/Header'
import Layout from '@/components/Layout/Layout'
import React from 'react'
import { useEffect } from 'react'

export default function AddCollects() {

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.location.href = '/pages/Login'; // Redirect to AddCollects page
    }
  }, []);
  return (
    <>
      <Header />
      <main>
        <FormAddCollect />
      </main>
      <Footer />
    </>
  )
}
