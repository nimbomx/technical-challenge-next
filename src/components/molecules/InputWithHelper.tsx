'use client'

import { ChangeEvent, FC, useRef } from "react";
import { Input } from "../atoms/Input"

interface Props{
    placeholder?:string
    helper?:string
    required?:boolean
    type?:string
    value?:string
    onChange?:(value: string) => void;
}
export const InputWithHelper:FC<Props> = ({placeholder, required, helper, type, value, onChange}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e.target.value)
    }
    return <>
        <Input ref={inputRef} 
            onChange={onChangeHandler}
            value={value}
            type={type}
            placeholder={placeholder} 
            required={required}  />
        { helper && inputRef.current && !inputRef.current.validity.valid && (
            <small>{helper}</small>
        )}
    </>
}