'use client'
/* eslint-disable @next/next/no-img-element */

import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Input } from "../atoms/Input"
import { FormHelper } from "../atoms/FormHelper"
import { CountryType } from "@/types/Country.type"

interface Props{
    value:string
    helper?:string
    country:CountryType
    required?:boolean
    onChange: (value:string) => void
}

export const PhoneNumberInput:FC<Props> = ({value, helper, onChange, country, required}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [rest, setRest] = useState('(000) 000-0000');

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatN(e.target.value)
        onChange(country.phone_code +' '+formattedValue)
    }
    useEffect(() => {
        setRest('(000) 000-0000'.slice(value.length));
    },[value])

    return <>
        <div role="presentation" style={{ position: "absolute", top:"8px", left:"81px", fontFamily: "'Inter', system-ui", fontWeight: "400", fontSize: "16px",
                pointerEvents: "none",
                userSelect: "none"
            }}><span style={{color:"transparent"}}>{value}</span><span style={{color:"#757D8A"}}>{rest}</span></div>

            <Input ref={inputRef} 
                style={{
                    paddingLeft:"80px"
                }}
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

export const PhoneCodeDisplays = styled.div`

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