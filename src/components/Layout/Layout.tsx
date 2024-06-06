import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './Layout.css'


interface LayoutProps {
  children?: React.ReactNode
  variant?: string;


}

export default function Layout({ children, variant }: LayoutProps) {
  return (
    <div className={`layout ${variant}`}>
      <Header />
      <main className='layout-main'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
