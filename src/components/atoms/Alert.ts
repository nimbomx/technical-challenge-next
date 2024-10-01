'use client'
import styled from "styled-components";

interface Props{
    variant?: 'success'
}
export const Alert = styled.div<Props>`
    border: 1px solid ${ props => props.variant === 'success' ? "#008000" : "#EF4444"};
    background-color: ${ props => props.variant === 'success' ? "rgba(0,128,0,.08)" : "rgba(239,68,68,.08)"} ;
    border-radius: 8px;
    padding: 14px;
    font-size: 1rem;
    font-weight: 400;
    color: ${ props => props.variant === 'success' ? "#008000" : "#EF4444"};
    margin-bottom: 32px;
`
