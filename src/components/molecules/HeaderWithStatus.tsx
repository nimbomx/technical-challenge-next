'use client'

import { useEffect, useState } from "react";
import { Header } from "../atoms/Header"
import useFormStore from "@/stores/form.store";
import { FORM_STATUS } from "@/constants/FORM_STATUS";
import { StatusBadge } from "../atoms/StatusBadge";
import { StatusType } from "@/types/FormStatus.type";

export const HeaderWithStatus = () => {
    const [isMounted, setIsMounted] = useState(false);
    const status = useFormStore( state => state.status )

  
    useEffect(() => {
      setIsMounted(true);
    }, []);

    return <Header>
        <span>New Company</span>
        {isMounted && FORM_STATUS[status].variant != 'hidden' && <StatusBadge variant={(FORM_STATUS[status] as StatusType).variant}>{FORM_STATUS[status].label}</StatusBadge>}
        
    </Header>
}