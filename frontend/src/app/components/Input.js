"use client"

export default function Input({ type = "text", onChange, placeholder }) {
  return (
    <input type={type} onChange={onChange} placeholder={placeholder} />
  );
}
