'use client'
/* eslint-disable @next/next/no-img-element */

import { countries } from "@/constants/COUNTRIES"
import { CountryType } from "@/types/Country.type"
import { ChangeEvent, FC } from "react"
import styled from "styled-components"

interface Props{
    country:CountryType,
    onChange: (country:CountryType) => void
}
export const PhoneCodeSelector:FC<Props> = ({country, onChange}) => {

    const changeCountryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(countries.find(c => c.name === e.target.value)!)
    }
    return <>
        <PhoneCodeSelect
            value={country.name}
            onChange={ changeCountryHandler}
        >
            {countries.map(country => (
                <option key={country.name} value={country.name}>
                    {country.name} {country.phone_code}
                </option>
            ))}
        </PhoneCodeSelect>
        <PhoneCodeDisplay>
            {!!country && (<>
                <img src={country.flag_url} alt={`${country.name} flag`}
                    width={30}
                    height={20}
                />
                <span>{country.phone_code}</span>
            </>)}
        </PhoneCodeDisplay>

    </>
}

export const PhoneCodeDisplay = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    top:7px;
    left:8px;
    gap:8px;
    & img {
        filter: drop-shadow(0px 0px 1px rgb(0 0 0 / 0.4));
    }
    & span {
        text-align: right;
        min-width: 30px;
    }
`
export const PhoneCodeSelect = styled.select`
    position: absolute;
    top: 2px;
    left: 2px;
    border: none;
    font-size: 1rem;
    height: 30px;
    opacity:0;
    width:75px;
    cursor:pointer;
    z-index:10;
`