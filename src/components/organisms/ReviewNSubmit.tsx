import useFormStore from "@/stores/form.store"
import { FormEvent } from "react"
import { ConfirmButton } from "../molecules/ConfirmButton"
import { Form } from "../atoms/Form"
import { FormBlock } from "../atoms/FormBlock"

export const ReviewNSubmit = () => {
    const increment = useFormStore( state => state.increment )

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        increment()
    }
    return <Form onSubmit={submitHandler}>
        <FormBlock>
            <label>Business structure</label>
        </FormBlock>

        <FormBlock>
            <label>Contact person</label>
        </FormBlock>

        <ConfirmButton />
    </Form>
}