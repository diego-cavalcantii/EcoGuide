'use client'
import React, { useEffect } from 'react'
import { membersList } from '@/mocks/memberList'
import './Footer.css'

interface FooterProps {
  variant?: string
}

export default function Footer({ variant }: FooterProps) {
  const [members, setMembers] = React.useState(membersList)

  useEffect(() => {
    setMembers(membersList)
  }, [])


  return (
    <footer className={variant}>
      {members.map(({ name, rm, turma }, index) => (
        <p key={index}>{`| ${name} - ${rm} - ${turma} |`}</p>
      ))}
    </footer>
  )
}
