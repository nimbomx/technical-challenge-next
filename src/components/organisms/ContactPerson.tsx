import useFormStore from "@/stores/form.store"
import { ContinueButton } from "../molecules/ContinueButton"
import { FormEvent } from "react"

export const ContactPerson = () => {
    const increment = useFormStore( state => state.increment )

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        increment()
    }
    return <form onSubmit={submitHandler}>
        Contact
        <ContinueButton />
    </form>
}