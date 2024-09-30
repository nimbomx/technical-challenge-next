'use client'

import useFormStore from "@/stores/form.store"
import { ContinueButton } from "../molecules/ContinueButton"
import { FormEvent, useState } from "react"
import { company_types } from "@/constants/COMPANY_TYPES"
import { FormBlock } from "../atoms/FormBlock"
import { FormGroup } from "../atoms/FormGroup"
import { InputWithHelper } from "../molecules/InputWithHelper"
import { SelectWithHelper } from "../molecules/SelectWithHelper"
import { Form } from "../atoms/Form"

export const BusinessStructure = () => {
    const increment = useFormStore( state => state.increment )
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
    return <Form onSubmit={submitHandler}  className={wasValidated ? 'was-validated' : ''} noValidate >
        <FormBlock>
            <label>Business name</label>
            <InputWithHelper placeholder="Registered business name" required helper="Business name id required" />
        </FormBlock>
        <FormBlock>
            <label>Type</label>
            <SelectWithHelper required defaultValue="" placeholder="Type of business" helper="Type value is required" >
                {company_types.map( (type, ix) => <option key={ix} value={type}>{type}</option>)}
            </SelectWithHelper>
        </FormBlock>
        <FormBlock>
            <label>Address</label>
            <InputWithHelper placeholder="Address line 1"  required/>
            <InputWithHelper placeholder="Address line 2 (optional)" />
            <InputWithHelper placeholder="City"  required/>
            <FormGroup>
                <InputWithHelper placeholder="State"  required/>
                <InputWithHelper placeholder="Zip"  required/>
            </FormGroup>
        </FormBlock>

        <ContinueButton />
    </Form>
}