import { ChangeEvent, FC, ReactNode, useRef } from "react";
import { Select } from "../atoms/Select";

interface Props{
    placeholder?:string
    value?:string
    defaultValue?:string
    helper?:string
    required?:boolean
    children?: ReactNode | ReactNode[],
    onChange?:(value: string) => void;
}
export const SelectWithHelper:FC<Props> = ({placeholder, required, helper, children, defaultValue, value, onChange}) => {
    const selectRef = useRef<HTMLSelectElement>(null);
    const onChangeHandler = (e:ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e.target.value)
    }
    return <>
        <Select ref={selectRef} required={required} 
            onChange={onChangeHandler}
            value={value}
            defaultValue={defaultValue} >
            {!!placeholder && <option value="" disabled>{placeholder}</option>}
            {children}
        </Select>
        { helper && selectRef.current && !selectRef.current.validity.valid && (
            <small>{helper}</small>
        )}
    </>
}