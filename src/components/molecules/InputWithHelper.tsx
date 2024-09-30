'use client'

import { FC, useRef } from "react";
import { Input } from "../atoms/Input"

interface Props{
    placeholder?:string
    helper?:string
    required?:boolean
    type?:string
}
export const InputWithHelper:FC<Props> = ({placeholder, required, helper, type}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return <>
        <Input ref={inputRef} 
            type={type}
            placeholder={placeholder} 
            required={required}  />
        { helper && inputRef.current && !inputRef.current.validity.valid && (
            <small>{helper}</small>
        )}
    </>
}