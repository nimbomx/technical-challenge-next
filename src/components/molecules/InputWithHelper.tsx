import { FC, useRef } from "react";
import { Input } from "../atoms/Input"

interface Props{
    placeholder?:string
    helper?:string
    required?:boolean
}
export const InputWithHelper:FC<Props> = ({placeholder, required, helper}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return <>
        <Input ref={inputRef} placeholder={placeholder} required={required}  />
        { helper && inputRef.current && !inputRef.current.validity.valid && (
            <small>{helper}</small>
        )}
    </>
}