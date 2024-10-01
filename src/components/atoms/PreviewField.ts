'use client'
import styled from "styled-components";

export const PreviewField = styled.div`
    display: flex;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 16px;
    &>div:first-of-type{
        width: 180px;
        color: #757D8A;
    }
    & > div:last-of-type{
        color: #404D61;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
`
