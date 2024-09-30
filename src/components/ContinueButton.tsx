import { Button } from "@/components/Button";
import { FC } from "react";

interface Props{
    onClick: () => void
}
export const ContinueButton:FC<Props> = ({onClick}) => {
    return <Button onClick={onClick}>
        Continue 
        <img src="/arrow-left.svg" width={16} height={16} alt="" role="presentation"  />
    </Button>
}