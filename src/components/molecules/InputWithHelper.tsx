'use client'

import { ChangeEvent, FC, useRef, WheelEvent } from "react";
import { Input } from "../atoms/Input"
import { FormHelper } from "../atoms/FormHelper";

interface Props{
    placeholder?:string
    helper?:string
    required?:boolean
    type?:string
    value?:string
    pattern?:string
    maxLength?:number
    onChange?:(value: string) => void;
}
export const InputWithHelper:FC<Props> = ({placeholder, required, helper, type, value, onChange, pattern, maxLength}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        if(onChange){
            onChange(e.target.value)
        }
    }
    const handleWheel = () => {
        if(type === 'number') inputRef.current?.blur() //prevent change number if user scroll over
    }
    /* eslint-disable @next/next/no-img-element */
    return <>
        <div>
            <Input ref={inputRef} 
                onWheel={handleWheel}
                onChange={onChangeHandler}
                value={value}
                maxLength={maxLength}
                type={type}
                placeholder={placeholder} 
                required={required}  
                pattern={pattern}
                />
                
            { helper && inputRef.current && !inputRef.current.validity.valid && (
                <FormHelper><img src="/warning.svg" width={20} height={20} alt="" role="presentation" />{helper}</FormHelper>
            )}
        </div>
    </>
}