'use client'

import useFormStore from "@/stores/form.store"
import { ContinueButton } from "../molecules/ContinueButton"
import { FormEvent, useState } from "react"
import { FormBlock } from "../atoms/FormBlock"
import { FormGroup } from "../atoms/FormGroup"
import { InputWithHelper } from "../molecules/InputWithHelper"
import { Form } from "../atoms/Form"

export const ContactPerson = () => {
    const increment = useFormStore( state => state.increment )
    const [wasValidated, setWasValidated] = useState(false)

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity()) {
            increment()
        } else {
            console.log("Formulario no válido");
        }
        setWasValidated(true)
        
    }
    return <Form onSubmit={submitHandler} className={wasValidated ? 'was-validated' : ''} noValidate>
        <FormBlock>
            <FormGroup>
                <InputWithHelper placeholder="First Name"  required/>
                <InputWithHelper placeholder="Last Name"  required/>
            </FormGroup>
        </FormBlock>
        <FormBlock>
            <label>Email</label>
            <InputWithHelper type="email" placeholder="Email"  required/>
        </FormBlock>
        <FormBlock>
            <label>Phone</label>
            <InputWithHelper  placeholder="(000) 000-0000"  required/>
        </FormBlock>

        <ContinueButton />
    </Form>
}