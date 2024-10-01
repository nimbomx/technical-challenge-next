import useFormStore from "@/stores/form.store"
import { FormEvent } from "react"
import { ConfirmButton } from "../molecules/ConfirmButton"
import { Form } from "../atoms/Form"
import { FormBlock } from "../atoms/FormBlock"
import { EditButton } from "../atoms/EditButton"

export const ReviewNSubmit = () => {
    const data = useFormStore( state => state.data )
    const increment = useFormStore( state => state.increment )
    const setStatus = useFormStore( state => state.setStatus )
    const setStep = useFormStore( state => state.setStep )

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/company',{
            method:"POST",
            body:JSON.stringify(data)
        })
        const output = await res.json()
        if(res.ok){
            if(output.status === 'ok') setStatus('success')
            if(output.status === 'error') setStatus('error')
        }else{
            setStatus('error')
        }
        console.log(output)
        // increment()
        // setStatus("init")
        
    }
    return <Form onSubmit={submitHandler}>
        <FormBlock>
            <div>
                <label>Business structure</label>
                <EditButton onClick={() => setStep(0)}>Edit</EditButton>
            </div>
            <div>Name: {data.name}</div>
            <div>Type: {data.type}</div>
            <div>
                <div>Address: </div>
                <div>
                    {data.address.line1}
                    {!!data.address.line2  && data.address.line2}
                    {data.address.city}, {data.address.state} {data.address.zip}
                </div>
            </div>
        </FormBlock>

        <FormBlock>
            <div>
                <label>Contact person</label>
                <EditButton onClick={() => setStep(1)}>Edit</EditButton>
            </div>
            <div>Name: {data.contact.firstName} {data.contact.lastName}</div>
            <div>Email: {data.contact.email}</div>
            <div>Phone: {data.contact.phone}</div>
        </FormBlock>

        <ConfirmButton />
    </Form>
}