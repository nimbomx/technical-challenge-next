'use client'
import styled from "styled-components";

interface Props {
    variant?: 'validated';
}

export const Select = styled.select<Props>`
    margin-bottom: 16px;
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid #E1E3E6;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 400;
    color: black;
    
    padding-left: 16px;
    padding-right: 16px;
    appearance: none;
    background-image: url('/caret-down.svg');
    background-repeat: no-repeat;
    background-position: calc(100% - 16px) 11px;
    background-size: 14px 7px;

    &.placeholder {
        color: #757D8A;
    }
    form.was-validated & {
        &:invalid{
            border: 1px solid red;
        }
    }
`
