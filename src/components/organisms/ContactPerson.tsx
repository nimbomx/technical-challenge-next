'use client'

import useFormStore from "@/stores/form.store"
import { ContinueButton } from "../molecules/ContinueButton"
import { FormEvent, useState } from "react"
import { FormBlock } from "../atoms/FormBlock"
import { FormGroup } from "../atoms/FormGroup"
import { InputWithHelper } from "../molecules/InputWithHelper"
import { Form } from "../atoms/Form"

export const ContactPerson = () => {
    const data = useFormStore( state => state.data )
    const increment = useFormStore( state => state.increment )
    const updateData = useFormStore( state => state.updateData )
    const setStatus = useFormStore( state => state.setStatus )
    const [wasValidated, setWasValidated] = useState(false)

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity()) {
            increment()
            setStatus('in_progress')
        } else {
            console.log("Formulario no válido");
        }
        setWasValidated(true)
        
    }
    return <Form onSubmit={submitHandler} className={wasValidated ? 'was-validated' : ''} noValidate>
        <FormBlock>
            <FormGroup>
                <InputWithHelper value={data.contact.firstName}
                    onChange={ e => updateData({contact:{...data.contact, firstName:e}})}
                    placeholder="First Name"  required/>
                <InputWithHelper value={data.contact.lastName} 
                    onChange={ e => updateData({contact:{...data.contact, lastName:e}})}
                    placeholder="Last Name"  required/>
            </FormGroup>
        </FormBlock>
        <FormBlock>
            <label>Email</label>
            <InputWithHelper value={data.contact.email} 
                onChange={ e => updateData({contact:{...data.contact, email:e}})}
                type="email" placeholder="Email"  required/>
        </FormBlock>
        <FormBlock>
            <label>Phone</label>
            <InputWithHelper value={data.contact.phone}  
                onChange={ e => updateData({contact:{...data.contact, phone:e}})}
                placeholder="(000) 000-0000"  required/>
        </FormBlock>

        <ContinueButton />
    </Form>
}