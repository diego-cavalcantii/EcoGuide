'use client'
import React, { useEffect } from 'react'
import { membersList } from '@/mocks/memberList'
import './Footer.css'

export default function Footer() {
  const [members, setMembers] = React.useState(membersList)

  useEffect(() => {
    setMembers(membersList)
  }, [])


  return (
    <footer>
      {members.map(({ name, rm, turma }, index) => (
        <p key={index}>{`| ${name} - ${rm} - ${turma} |`}</p>
      ))}
    </footer>
  )
}
