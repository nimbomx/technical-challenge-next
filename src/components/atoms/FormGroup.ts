'use client'
import styled from "styled-components";

export const FormGroup = styled.div`
    display: flex;
    flex: 1;
    justify-items: stretch;
    gap:8px;
    & input, & select{
        flex:1;
        min-width: 0;
    }
`