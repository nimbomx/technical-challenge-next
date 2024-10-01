import useFormStore from "@/stores/form.store";
import { Button } from "../atoms/Button";
import { FC } from "react";


/* eslint-disable @next/next/no-img-element */
export const StartOverButton:FC = () => {
    const setMaxStep = useFormStore(state =>  state.setMaxStep )
    const setStatus = useFormStore(state =>  state.setStatus )
    const clearData = useFormStore(state =>  state.clearData )
    const startOver = () => {
        setMaxStep(0)
        setStatus("init")
        clearData()
    }
    return <Button onClick={startOver} type="submit">
        Start Over 
        <img src="/arrow-left.svg" width={16} height={16} alt="" role="presentation"  />
    </Button>
}