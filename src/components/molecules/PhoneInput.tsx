'use client'

import { FC, useEffect, useState } from "react";
import { countries } from "@/constants/COUNTRIES";
import { PhoneCodeSelector } from "./PhoneCodeSelector";
import { formatN, PhoneNumberInput } from "./PhoneNumberInput";
import styled from "styled-components";
import useFormStore from "@/stores/form.store";

interface Props{
    helper?:string
    required?:boolean
    type?:string
    value?:string
    onChange:(value: string) => void;
}

export const PhoneInput:FC<Props> = ({required, helper, value, onChange}) => {
    

    const country = useFormStore( state => state.country )
    const setCountry = useFormStore( state => state.setCountry )
    const [formatted, setFormatted] = useState('');

    useEffect(() => {
        if(formatted === ''){ //for some reason on first load formatted become '' when value is not
            if(value != '') return
        }
        onChange(country.phone_code +' '+formatted)
    },[country])

    const updatePhoneNumberValue = () => {
        if (value) {
            const rawValue = value.includes("(") ? value.replace(/^.*?\(/, '(').replace(/\D/g, '') : '';
            const formattedValue = formatN(rawValue);
            setFormatted(formattedValue);
        }
    }

    useEffect(() => {
        updatePhoneNumberValue()
    }, [value]);


    return <>
        <PhoneCanvas>
            <PhoneCodeSelector />
            <PhoneNumberInput value={formatted} helper={helper} required={required} country={country} onChange={onChange} />
        </PhoneCanvas>
    </>
}

const PhoneCanvas = styled.div`
    position: relative;
`