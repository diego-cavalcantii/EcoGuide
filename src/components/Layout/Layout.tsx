import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'


interface LayoutProps {
  children?: React.ReactNode
  variant?:string;

}

export default function Layout({ children,variant }: LayoutProps) {
  return (
    <div className={variant}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
