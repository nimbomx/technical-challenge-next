'use client'
import styled from "styled-components";

export const PreviewField = styled.div`
    display: flex;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
    flex-direction: column;
    &>div:first-of-type{
        width: 180px;
        color: #757D8A;
        margin-bottom: 8px;
    }
    & > div:last-of-type{
        color: #404D61;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    @media (min-width: 768px) {
        flex-direction: row;
        margin-bottom: 16px;
    }
`
