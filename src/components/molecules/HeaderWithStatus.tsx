'use client'

import { useEffect, useState } from "react";
import { Header } from "../atoms/Header"
import useFormStore from "@/stores/form.store";
import { FORM_STATUS } from "@/constants/FORM_STATUS";

export const HeaderWithStatus = () => {
    const [isMounted, setIsMounted] = useState(false);
    const status = useFormStore( state => state.status )

  
    useEffect(() => {
      setIsMounted(true);
    }, []);

    return <Header>
        New Company
        {isMounted && FORM_STATUS[status].variant != 'hidden' && <div>{FORM_STATUS[status].label}</div>}
        
    </Header>
}