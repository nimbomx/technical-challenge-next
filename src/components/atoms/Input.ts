'use client'
import styled from "styled-components";

interface Props {
    variant?: 'validated';
}

export const Input = styled.input<Props>`
    margin-bottom: 16px;
    font-family: "Inter", system-ui;
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid #E1E3E6;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 400;

    padding: 16px;

    &::placeholder{
        color: #757D8A;
    }

    form.was-validated & {
        &:invalid{
            border: 1px solid red;
        }
    }

`