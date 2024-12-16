import { client } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:string}}){

    console.log('ENDPOINT HIT!!')

    try {
        const userProfile=await client.user.findUnique({
            where:{
                clerkid:params.id
            },
            include:{
                studio:true,
                subscription:{
                    select:{
                        plan:true
                    }
                }
            }
        })
        if(userProfile) return NextResponse.json({status:200,user:userProfile});
        const clerkUserInstance=await clerkClient.users.getUser(params.id);
        const createUser=await client.user.create({
            data:{
                clerkid:params.id,
                email:clerkUserInstance.emailAddresses[0].emailAddress,
                firstname:clerkUserInstance.firstname,
                lastname:clerkUserInstance.lastname,
                studio:{
                    create:{}
                },
                workspace:{
                    create:{
                        name:`${clerkUserInstance.firstName}'s Workspace`,
                        type:'PERSONAL'  
                    },
                },
                subscription:{
                    create:{}
                }
            },
            include:{
                subscription:{
                    select:{
                        plan:true
                    }
                }
            }
        })
        if(createUser) return NextResponse.json({status:201,user:createUser})
        return NextResponse.json({status:400})
            
    } catch (error) {
        console.log('ERROR',error)
    }
}