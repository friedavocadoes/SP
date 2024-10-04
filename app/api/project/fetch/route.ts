import {connect} from "@/dbConfig/dbConfig";
import projectModel from '@/models/projectModel';
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email} = reqBody

        //check if project exists
        const project = await projectModel.findOne({email})
        // console.log(project)

        if(!project){
            return NextResponse.json({error: "Project does not exist"}, {status: 400})
        }
        
        return NextResponse.json({
            data: project
        })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}