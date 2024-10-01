'use client'
import styled from "styled-components";

interface Props {
    variant?: 'validated';
}

export const Input = styled.input<Props>`
    margin-bottom: 16px;
    width: 100%;
    form.was-validated & {
        &:invalid{
            border: 1px solid red;
        }
    }

`
