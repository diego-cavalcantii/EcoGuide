'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import './RouteAddCollects.css'
import Link from 'next/link'

interface ButtonProps {
  children?: string
}

export default function Button({ children }: ButtonProps) {


  return (
    <Link href={'/AddCollects'}>
      <button className='add-collection'>{children}</button>
    </Link>
  )
}
