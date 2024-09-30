import { FC, ReactNode, useRef } from "react";
import { Select } from "../atoms/Select";

interface Props{
    placeholder?:string
    defaultValue?:string
    helper?:string
    required?:boolean
    children?: ReactNode | ReactNode[]
}
export const SelectWithHelper:FC<Props> = ({placeholder, required, helper, children, defaultValue}) => {
    const selectRef = useRef<HTMLSelectElement>(null);
    
    return <>
        <Select ref={selectRef} required={required} defaultValue={defaultValue} >
            {!!placeholder && <option value="" disabled>{placeholder}</option>}
            {children}
        </Select>
        { helper && selectRef.current && !selectRef.current.validity.valid && (
            <small>{helper}</small>
        )}
    </>
}