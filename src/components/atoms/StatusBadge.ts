'use client'
import { StatusTypeVariants } from "@/types/FormStatus.type";
import styled from "styled-components";

interface Props{
    variant: StatusTypeVariants
}
export const StatusBadge = styled.div<Props>`

    background-color: rgba(128, 128, 128, .08);
    height: 18px;
    border-radius: 3px;
    padding-left: 4px;
    padding-right: 4px;
    justify-content: center;
    align-items: center;
    display: flex;

    font-size: 12px;
    font-weight: 400;

    color: ${ (props) => {
        switch (props.variant) {
            case 'warning':
                return "#FFA500;"
            case 'success':
                return "#008000;"
            case 'error':
                return "#FF0000;"
            default:
                return "black;"
        }
    } }

`
