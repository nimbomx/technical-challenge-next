'use client'
import styled from "styled-components";

interface Props {
    variant?: 'validated';
}

export const Select = styled.select<Props>`
    margin-bottom: 16px;
    width: 100%;
    form.was-validated & {
        &:invalid{
            border: 1px solid red;
        }
    }
`
