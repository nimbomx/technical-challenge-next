import { ChangeEvent, FC, ReactNode, useRef } from "react";
import { Select } from "../atoms/Select";
import { FormHelper } from "../atoms/FormHelper";

interface Props{
    placeholder?:string
    value?:string
    defaultValue?:string
    helper?:string
    required?:boolean
    children?: ReactNode | ReactNode[],
    onChange?:(value: string) => void;
}
/* eslint-disable @next/next/no-img-element */
export const SelectWithHelper:FC<Props> = ({placeholder, required, helper, children, defaultValue, value, onChange}) => {
    const selectRef = useRef<HTMLSelectElement>(null);
    const onChangeHandler = (e:ChangeEvent<HTMLSelectElement>) => {
        if(onChange){
            onChange(e.target.value)
        }
    }
    return <div>
        <Select ref={selectRef} required={required} className={`${value ? '' : 'placeholder'}`}
            onChange={onChangeHandler}
            value={value}
            defaultValue={defaultValue} >
            {!!placeholder && <option value="" disabled>{placeholder}</option>}
            {children}
        </Select>
        { helper && selectRef.current && !selectRef.current.validity.valid && (
            <FormHelper><img src="/warning.svg" width={20} height={20} alt="" role="presentation" />{helper}</FormHelper>
        )}
    </div>
}