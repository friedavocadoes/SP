import {connect} from "@/dbConfig/dbConfig";
import projectModel from '@/models/projectModel';
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, projectName, location, description} = reqBody

        //check if project exists
        const project = await projectModel.findOne({email})
        // console.log(project)

        if(!project){
            return NextResponse.json({error: "Project does not exist"}, {status: 400})
        }
        
        const newProject = {
            projectName,
            location,
            description,
            dailyLogs: [], 
        };
  
        project.projects.push(newProject);

        
        await project.save();

        return NextResponse.json({ message: "Project added successfully", data: newProject }, { status: 200 });
  

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}