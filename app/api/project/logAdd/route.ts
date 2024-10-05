import {connect} from "@/dbConfig/dbConfig";
import projectModel from '@/models/projectModel';
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, index, materialType, quantity, cost, deliveryDate} = reqBody

        //check if project exists
        const project = await projectModel.findOne({email})
        // console.log(project)

        if(!project){
            return NextResponse.json({error: "Project does not exist"}, {status: 400})
        }
        
        const log = {
            materialType,
            quantity,
            cost,
            deliveryDate,
        };
  
        project.projects[index-1].dailyLogs.push(log);

        
        await project.save();

        return NextResponse.json({ message: "Log added successfully", data: log }, { status: 200 });
  

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}