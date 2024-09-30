import { Button } from "../atoms/Button";
import { FC } from "react";

interface Props{
    onClick?: () => void
}
export const ConfirmButton:FC<Props> = ({onClick}) => {
    return <Button onClick={onClick} type="submit">
        Confirm & Submit 
        <img src="/arrow-left.svg" width={16} height={16} alt="" role="presentation"  />
    </Button>
}