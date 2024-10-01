import useFormStore from "@/stores/form.store"
import { FormEvent, useState } from "react"
import { ConfirmButton } from "../molecules/ConfirmButton"
import { Form } from "../atoms/Form"
import { FormBlock } from "../atoms/FormBlock"
import { EditButton } from "../atoms/EditButton"
import { StartOverButton } from "../molecules/StartOverButton"
import { Alert } from "../atoms/Alert"
import { Label } from "../atoms/Label"
import { PreviewField } from "../atoms/PreviewField"

export const ReviewNSubmit = () => {
    const data = useFormStore( state => state.data )
    const status = useFormStore( state => state.status )
    const setStatus = useFormStore( state => state.setStatus )
    const setStep = useFormStore( state => state.setStep )

    const [error_message, setErrorMessage] = useState('')
    const [success_message, setSuccessMessage] = useState('')

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + '/company',{
            method:"POST",
            body:JSON.stringify(data)
        })
        const output = await res.json()
        if(res.ok){
            if(output.status === 'ok') {
                setStatus('success')
                setSuccessMessage(output.message)
            }
            //ERROR 200
            if(output.status === 'error') {
                setStatus('error')
                setErrorMessage(output.message)
            }
        }else{
            //ERROR 500
            setStatus('error')
            setErrorMessage(output.message)
        }
        
    }
    return <Form onSubmit={submitHandler}>
        <FormBlock>
            <div style={{
                display:"flex",
                gap:"8px",
                alignItems: "baseline",
                marginBottom: "30px"
            }}>
                <Label>Business structure</Label>
                <EditButton onClick={() => setStep(0)}>Edit</EditButton>
            </div>
            <PreviewField>
                <div>Name:</div>
                <div>{data.name}</div>                
            </PreviewField>
            <PreviewField>
                <div>Type:</div>
                <div>{data.type}</div>   
            </PreviewField>
            <PreviewField>
                <div>Address: </div>
                <div>
                    <div>{data.address.line1}</div>
                    {!!data.address.line2  && <div>{data.address.line2}</div>}
                    <div>{data.address.city}, {data.address.state} {data.address.zip}</div>
                </div>
            </PreviewField>
        </FormBlock>

        <FormBlock>
            <div style={{
                    display:"flex",
                    gap:"8px",
                    alignItems: "baseline",
                    marginBottom: "30px"
                }}>
                <Label>Contact person</Label>
                <EditButton onClick={() => setStep(1)}>Edit</EditButton>
            </div>
            <PreviewField>
                <div>Name: </div>
                <div>{data.contact.firstName} {data.contact.lastName}</div>
            </PreviewField>

            <PreviewField>
                <div>Email: </div>
                <div>{data.contact.email}</div>
            </PreviewField>
            <PreviewField>
                <div>Phone: </div>
                <div>{data.contact.phone}</div>
            </PreviewField>
        </FormBlock>

        
        {status === 'success' && <Alert variant="success">{success_message}</Alert>}

        {status != 'success' &&<ConfirmButton />}
        {status === 'success' && <StartOverButton />}

        {status === 'error' && <Alert>{error_message}</Alert>}
    </Form>
}