'use client'
import styled from "styled-components";

export const FormBlock = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
    gap: 8px;
    @media (min-width: 768px) {
        gap: 16px;
    }

`
export const FormBlockTitle = styled.div`
    display: flex;
    align-items: "baseline";
    gap: 8px;
    margin-bottom: 8px;
    @media (min-width: 768px) {
        margin-bottom: 30px;
    }
`
