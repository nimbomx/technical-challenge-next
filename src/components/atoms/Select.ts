'use client'
import styled from "styled-components";

export const Select = styled.select`
    margin-bottom: 16px;
    form.was-validated & {
        &:invalid{
            border: 1px solid red;
        }
    }
`
