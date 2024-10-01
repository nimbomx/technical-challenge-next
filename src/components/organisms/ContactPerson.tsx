'use client'

import useFormStore from "@/stores/form.store"
import { ContinueButton } from "../molecules/ContinueButton"
import { FormEvent, useRef, useState } from "react"
import { FormBlock } from "../atoms/FormBlock"
import { FormGroup } from "../atoms/FormGroup"
import { InputWithHelper } from "../molecules/InputWithHelper"
import { Form } from "../atoms/Form"
import { Label } from "../atoms/Label"
import { PhoneInput } from "../molecules/PhoneInput"

export const ContactPerson = () => {
    const data = useFormStore( state => state.data )
    const setMaxStep = useFormStore( state => state.setMaxStep )
    const updateData = useFormStore( state => state.updateData )
    const setStatus = useFormStore( state => state.setStatus )
    const [wasValidated, setWasValidated] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = formRef.current;
        if (e.currentTarget.checkValidity()) {
            setMaxStep(2)
            setStatus('in_progress')
        } else {
            // Focus first invalid field
            const firstInvalidElement = form?.querySelector<HTMLElement>(':invalid');
            firstInvalidElement?.focus();
        }
        setWasValidated(true)
    }

    return <Form onSubmit={submitHandler} className={wasValidated ? 'was-validated' : ''} noValidate ref={formRef} >
        <FormBlock>
        <Label>Name</Label>
            <FormGroup>
                <InputWithHelper value={data.contact.firstName}
                    onChange={ e => updateData({contact:{...data.contact, firstName:e}})}
                    placeholder="First Name"  required
                    helper="First Name value is required"
                    />
                <InputWithHelper value={data.contact.lastName} 
                    onChange={ e => updateData({contact:{...data.contact, lastName:e}})}
                    placeholder="Last Name"  required
                    helper="Last Name value is required"
                    />
            </FormGroup>
        </FormBlock>
        <FormBlock>
            <Label>Email</Label>
            <InputWithHelper value={data.contact.email} 
                onChange={ e => updateData({contact:{...data.contact, email:e}})}
                type="email" placeholder="Email"  required
                helper="Please make sure your email address is correctly formed."
                />
        </FormBlock>
        <FormBlock>
            <Label>Phone</Label>
            <PhoneInput  
                value={data.contact.phone} 
                onChange={ e => updateData({contact:{...data.contact, phone:e}})}
                required
                helper="Please make sure your phone number is correctly formed."
            />
        </FormBlock>

        <ContinueButton />
        {/* <pre style={{fontSize:"10px"}}>{JSON.stringify(data, null, 2)}</pre> */}
    </Form>
}