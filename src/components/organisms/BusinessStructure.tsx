'use client'

import useFormStore from "@/stores/form.store"
import { ContinueButton } from "../molecules/ContinueButton"
import { FormEvent, useRef, useState } from "react"
import { company_types } from "@/constants/COMPANY_TYPES"
import { FormBlock } from "../atoms/FormBlock"
import { FormGroup } from "../atoms/FormGroup"
import { InputWithHelper } from "../molecules/InputWithHelper"
import { SelectWithHelper } from "../molecules/SelectWithHelper"
import { Form } from "../atoms/Form"
import { states } from "@/constants/STATES"
import { StateType } from "@/types/State.type"
import { Label } from "../atoms/Label"

export const BusinessStructure = () => {
    const data = useFormStore( state => state.data )
    const setMaxStep = useFormStore( state => state.setMaxStep )
    const updateData = useFormStore( state => state.updateData )
    const [wasValidated, setWasValidated] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = formRef.current;
        if (e.currentTarget.checkValidity()) {
            setMaxStep(1)
        } else {
            // Focus first invalid field
            const firstInvalidElement = form?.querySelector<HTMLElement>(':invalid');
            firstInvalidElement?.focus();
        }
        setWasValidated(true)
        
    }
    return <Form onSubmit={submitHandler}  className={wasValidated ? 'was-validated' : ''} noValidate ref={formRef} >
        <FormBlock>
            <Label>Business name</Label>
            <InputWithHelper value={data.name} onChange={ e => updateData({name:e})} placeholder="Registered business name" required helper="Business name id required" />
        </FormBlock>
        <FormBlock>
            <Label>Type</Label>
            <SelectWithHelper value={data.type} onChange={ e => updateData({type:e})} required defaultValue="" placeholder="Type of business" helper="Type value is required" >
                {company_types.map( (type, ix) => <option key={ix} value={type}>{type}</option>)}
            </SelectWithHelper>
        </FormBlock>
        <FormBlock>
            <Label>Address</Label>
            <InputWithHelper value={data.address.line1} onChange={ e => updateData({address:{...data.address, line1:e}})} placeholder="Address line 1"  required
                helper="Address value is required"
            />
            <InputWithHelper value={data.address.line2} onChange={ e => updateData({address:{...data.address, line2:e}})} placeholder="Address line 2 (optional)" />
            <InputWithHelper value={data.address.city} onChange={ e => updateData({address:{...data.address, city:e}})} placeholder="City"  required
                helper="City value is required"
            />
            <FormGroup>
                <SelectWithHelper value={data.address.state} onChange={ e => updateData({address:{...data.address, state:e}})} required defaultValue="" placeholder="State" helper="State value is required" >
                    {states.map( (state:StateType) => <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>)}
                </SelectWithHelper>
                <InputWithHelper 
                    value={data.address.zip} 
                    onChange={ e => updateData({address:{...data.address, zip:e}})} 
                    placeholder="Zip"  
                    maxLength={5}
                    // type="number"
                    pattern="\d{5}"
                    helper="Please enter exactly 5 numeric digits."
                    required
                />
            </FormGroup>
        </FormBlock>

        <ContinueButton />
    </Form>
}