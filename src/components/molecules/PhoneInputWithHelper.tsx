'use client'

import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react";
import { Input } from "../atoms/Input";
import { FormHelper } from "../atoms/FormHelper";
import { countries } from "@/constants/COUNTRIES";

/* eslint-disable @next/next/no-img-element */

interface Props {
  helper?: string;
  required?: boolean;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const formatN = (n: string) => {
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

export const PhoneInputWithHelper: FC<Props> = ({ required, helper, type, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [formatted, setFormatted] = useState('');
  const [country, setCountry] = useState(countries[0]);
  const [rest, setRest] = useState('');
  const [isValid, setIsValid] = useState(true);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    updatePhoneValue(rawValue)
  };
  const updatePhoneValue = useCallback((value?:string) => {
    const rawValue = value || inputRef.current?.value.replace(/\D/g, '') || ''
    const formattedValue = formatN(rawValue);
    setFormatted(formattedValue);
    setRest('(000) 000-0000'.slice(formattedValue.length));
    if (onChange) {
      onChange(country.phone_code + ' ' + formattedValue);
    }
    validateInput(formattedValue);
  },[inputRef, onChange, country])

    useEffect( () => {
        updatePhoneValue()
    },[country, updatePhoneValue])

  const validateInput = (value: string) => {
    const pattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    setIsValid(pattern.test(value));
  };

  useEffect(() => {
    if (value) {
      const rawValue = value.replace(/^.*?\(/, '(').replace(/\D/g, '');
      const formattedValue = formatN(rawValue);
      setFormatted(formattedValue);
      setRest('(000) 000-0000'.slice(formattedValue.length));
      validateInput(formattedValue);
    }
  }, [value]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <Input
          ref={inputRef}
          onChange={onChangeHandler}
          value={formatted}
          maxLength={16}
          type={type}
          required={required}
          pattern="\(\d{3}\) \d{3}-\d{4}"
          style={{
            color: "transparent",
            caretColor: "black",
            fontFamily: "monospace",
            paddingLeft: "116px"
          }}
        />
        {!!country && (
          <img
            style={{
              position: "absolute",
              top: "9px",
              left: "16px",
            }}
            src={country.flag_url}
            width={24}
            height={16}
            alt={`${country.name} flag`}
          />
        )}
        <select
          value={country.name}
          onChange={e => setCountry(countries.find(c => c.name === e.target.value)!)}
          style={{
            position: "absolute",
            top: "2px",
            left: "48px",
            border: "none",
            fontSize: "1rem",
            height: "30px",
          }}
        >
          {countries.map(country => (
            <option key={country.name} value={country.name}>
              {country.phone_code}
            </option>
          ))}
        </select>
        <div
          style={{
            position: "absolute",
            fontFamily: "monospace",
            top: "7px",
            left: "116px",
            pointerEvents: "none",
            userSelect: "none",
            fontSize: "1rem",
            fontWeight: "400",
          }}
        >
          {formatted}
          <span style={{ color: "#757D8A" }}>{rest}</span>
        </div>
        {helper && !isValid && (
          <FormHelper>
            <img src="/warning.svg" width={20} height={20} alt="" role="presentation" />
            {helper}
          </FormHelper>
        )}
      </div>
    </>
  );
};