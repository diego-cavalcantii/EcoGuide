import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Layout.css'


interface LayoutProps {
  children?: React.ReactNode


}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='layout'>
      <Header />
      <main className='layout-main'>
      {children}
      </main>
    </div>
  )
}
