import React from 'react'
import './TextField.css'

interface TextFieldProps {
  id: string;
  label?: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  value?: string;
  placeholder?: string;
  variant?: string;
  readonly?: boolean;
}

export const TextField = ({
  id,
  label,
  type = "text",
  onChange,
  required,
  minLength,
  maxLength,
  value,
  placeholder,
  variant,
  readonly
  
}: TextFieldProps) => {
  return (
    <div className={`text-field ${variant}`}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} onChange={onChange} required={required} minLength={minLength} maxLength={maxLength} value={value} placeholder={placeholder} readOnly={readonly} />
    </div>
  )
}
