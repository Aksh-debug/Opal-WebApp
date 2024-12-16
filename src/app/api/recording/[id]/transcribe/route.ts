import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req:NextRequest,
    {params}:{params:{id:string}}
){
    try {
        const body=await req.json();
        const {id}=params;
        const content=JSON.parse(body.content)

        const transcribed=await client.video.update({
            where:{
                userId:id,
                source:body.filename
            },
            data:{
                title:content.title,
                description:content.summary,
                summery:body.transcript
            }
        })
        if(transcribed){
            console.log('transcribed')
            return NextResponse.json({status:200})
        }
        return NextResponse.json({status:400})
        
    } catch (error) {
        console.log(error)
    }
}