import { NextRequest, NextResponse } from "next/server";

function randomFail(probability:number): boolean {
    return Math.random() < probability;
}

export async function POST(req: NextRequest):Promise<NextResponse> {
    const payload:any  = await req.json();
    if(payload.name === 'Sancrisoft' ){
        return NextResponse.json({ status: 'error', message: "A company with the same name has been detected. Please change the information entered." },{ status: 200})
    }
    if(randomFail(.3)){
        return NextResponse.json({ status: 'error', message: "Sorry, we are having technical issues. Try again. " },{ status: 500})   
    }
    return NextResponse.json({ status: 'ok', message: "Thanks for submitting your company! We’ll be in touch shortly. " },{ status: 200})   
}