import React from 'react'

interface TextFieldProps {
  id: string;
  label: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
}

export const TextField = ({
  id,
  label,
  type = "text",
  onChange,
  required,
  minLength
}: TextFieldProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} onChange={onChange} required={required} minLength={minLength} />
    </div>
  )
}
