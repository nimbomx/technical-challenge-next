'use client'
import styled from "styled-components";

export const Input = styled.input`
    margin-bottom: 16px;
    form.was-validated & {
        &:invalid{
            border: 1px solid red;
        }
    }
`
