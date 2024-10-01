import useFormStore from "@/stores/form.store"
import { FormEvent } from "react"
import { ConfirmButton } from "../molecules/ConfirmButton"
import { Form } from "../atoms/Form"
import { FormBlock, FormBlockTitle } from "../atoms/FormBlock"
import { EditButton } from "../atoms/EditButton"
import { StartOverButton } from "../molecules/StartOverButton"
import { Alert } from "../atoms/Alert"
import { Label } from "../atoms/Label"
import { PreviewField } from "../atoms/PreviewField"

export const ReviewNSubmit = () => {
    const data = useFormStore( state => state.data )
    const message = useFormStore( state => state.message )
    const status = useFormStore( state => state.status )
    const setStatus = useFormStore( state => state.setStatus )
    const setStep = useFormStore( state => state.setStep )
    const setMessage = useFormStore( state => state.setMessage )

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
                setMessage(output.message)
            }
            //ERROR 200
            if(output.status === 'error') {
                setStatus('error')
                setMessage(output.message)
            }
        }else{
            //ERROR 500
            setStatus('error')
            setMessage(output.message)
        }
        
    }
    return <Form onSubmit={submitHandler}>
        <FormBlock>
            <FormBlockTitle>
                <Label>Business structure</Label>
                <EditButton onClick={() => setStep(0)}>Edit</EditButton>
            </FormBlockTitle>
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
            <FormBlockTitle>
                <Label>Contact person</Label>
                <EditButton onClick={() => setStep(1)}>Edit</EditButton>
            </FormBlockTitle>
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

        
        {status === 'success' && <Alert variant="success">{message}</Alert>}

        {status != 'success' &&<ConfirmButton />}
        {status === 'success' && <StartOverButton />}

        {status === 'error' && <Alert>{message}</Alert>}
    </Form>
}