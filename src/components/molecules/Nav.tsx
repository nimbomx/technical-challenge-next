'use client'

import useFormStore from "@/stores/form.store";
import { useEffect, useState } from "react";
import styled from "styled-components"

interface Props{
    className?: string
}

const NavComponent = ({className}:Props) => {
    const [isMounted, setIsMounted] = useState(false);
    const step = useFormStore( state => state.step )
    const setStep = useFormStore( state => state.setStep )

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return <nav className={className}>
        <div>{/* DON'T DELETE */}</div>
        <ul >
            <li onClick={() => setStep(0)} className={`${isMounted && step===0 ? 'current' : '' }`}><span>1</span> Business structure</li>
            <li onClick={() => setStep(1)} className={`${isMounted && step===1 ? 'current' : '' }`}><span>2</span> Contact person</li>
            <li onClick={() => setStep(2)} className={`${isMounted && step===2 ? 'current' : '' }`}><span>3</span> Preview & submit</li>
        </ul>
    </nav>
}

export const Nav = styled(NavComponent)`
    --dot-width: 26px;
    --dot-padding: 3.5px;
    --space-between: 33px;
    display: flex;
    & > div {
        background-color: rgba(217, 217, 217, 0.44);
        border-radius: calc(var(--dot-width) + var(--dot-padding));
        width: var(--dot-width);
        padding: var(--dot-padding);
    }
    & ul{
        list-style: none;
        margin: 0;
        padding: var(--dot-padding);
        margin-left: calc(0px - (var(--dot-padding)*2) - var(--dot-width));
        display: flex;
        flex-direction: column;
        gap: var(--space-between);

        & li{
            margin: 0;
            padding: 0;
            cursor: pointer;
            white-space: nowrap;
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: 1rem;
            width: 40px;
            overflow: hidden;
            

            /* Media query para pantallas de al menos 768px de ancho */
            @media (min-width: 768px) {
                width: auto;
                overflow: auto;
            }

            & span{
                background-color: white;
                display: inline-flex;
                border-radius: 100%;
                width: var(--dot-width);
                height: var(--dot-width);
                min-width: var(--dot-width);
                color:black;
                justify-content: center;
                font-size: 12px;
                align-items: center;
                margin-right: 20px;
            }
        }
        & li.current{
            & span{
                background-color: var(--primary-color);
                color:white;
            }
        }
    }

`