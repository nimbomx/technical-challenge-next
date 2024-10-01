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
    const max_step = useFormStore( state => state.max_step )
    const status = useFormStore( state => state.status )
    const setStep = useFormStore( state => state.setStep )

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const gotoHandler = (n:number) => {
        if(n > max_step) return
        if(status!= 'success'){
            setStep(n)
        }
    }
    /* eslint-disable @next/next/no-img-element */
    return <nav className={`${className} ${status === 'success' ? 'all-success' : '' }`}>
        <div>{/* DON'T DELETE */}</div>
        <ul >
            <li onClick={() => gotoHandler(0)} className={`${(status === 'success' || max_step > 0) ?  'success' :  isMounted && step===0 ? 'current' : '' }`}><span>{(status === 'success' || max_step > 0) ? <img src="/check.svg" alt="checked" role="presentation" />  : 1}</span> Business structure</li>
            <li onClick={() => gotoHandler(1)} className={`${(status === 'success' || max_step > 1) ?  'success' :  isMounted && step===1 ? 'current' : '' }`}><span>{(status === 'success' || max_step > 1) ? <img src="/check.svg" alt="checked" role="presentation" />  : 2}</span> Contact person</li>
            <li onClick={() => gotoHandler(2)} className={`${(status === 'success' || max_step > 2) ?  'success' :  isMounted && step===2 ? 'current' : '' }`}><span>{status === 'success' ? <img src="/check.svg" alt="checked" role="presentation" />  : 3}</span> Preview & submit</li>
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
            cursor: default;
            white-space: nowrap;
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: 1rem;
            width: 40px;
            overflow: hidden;
            
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
            cursor: pointer;
            & span{
                background-color: var(--primary-color);
                color:white;
            }
        }
        & li.success{
            cursor: pointer;
            & span{
                color:white;
                background: #4ADE80;

            }
        }
    }

    &.all-success ul li.success {
        cursor: default;
    }

`