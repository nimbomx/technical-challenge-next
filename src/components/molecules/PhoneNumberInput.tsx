'use client'
/* eslint-disable @next/next/no-img-element */

import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Input } from "../atoms/Input"
import { FormHelper } from "../atoms/FormHelper"
import useFormStore from "@/stores/form.store"

interface Props{
    value:string
    helper?:string
    required?:boolean
    onChange: (value:string) => void
}

export const PhoneNumberInput:FC<Props> = ({value, helper, onChange, required}) => {
    const country = useFormStore( state => state.country )
    const inputRef = useRef<HTMLInputElement>(null);
    const [mask, setMask] = useState('(000) 000-0000');

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatN(e.target.value)
        onChange(country.phone_code +' '+formattedValue)
    }
    useEffect(() => {
        setMask('(000) 000-0000'.slice(value.length));
    },[value])

    return <>
        <PhoneMask role="presentation">
            <span>{value}</span>{mask}
        </PhoneMask>

        <Input ref={inputRef} 
            style={{ paddingLeft:"100px" }}
            onChange={onChangeHandler}
            value={value}
            maxLength={14}
            required={required}  
            pattern="\(\d{3}\) \d{3}-\d{4}"
        />

        { helper && inputRef.current && !inputRef.current.validity.valid && (
            <FormHelper><img src="/warning.svg" width={20} height={20} alt="" role="presentation" />{helper}</FormHelper>
        )}
    </>
}

export const PhoneMask = styled.div`
    position: absolute;
    top:8px;
    left:101px;
    font-Family: "Inter", system-ui;
    font-weight: 400;
    font-size: 16px;
    pointer-events: none;
    user-select: none;
    color: #757D8A;
    & > span:first-of-type{
        color: transparent;
    }
`

export const formatN = (n: string) => {
    let str = '';
    if (n) str = n.replace(/\D/g, '');
  
    const areaCode = str.slice(0, 3);
    const firstPart = str.slice(3, 6);
    const secondPart = str.slice(6, 10);
  
    let formattedNumber = '';
    if (areaCode) formattedNumber += `(${areaCode}`;
    if (firstPart) formattedNumber += `) ${firstPart}`;
    if (secondPart) formattedNumber += `-${secondPart}`;
    return formattedNumber.trim();
};