import { connect } from '@/dbConfig/dbConfig';
import { NextRequest } from 'next/server';
import { getDataFromToken } from '@/helper/getDataFromToken';
import User from '@/models/userModel';
import { NextResponse } from 'next/server';


connect()

export async function GET(request:NextRequest){
    try {

        // Extract user ID from the authentication token
        const userId = await getDataFromToken(request);
        // console.log(`user is ${userId}`);

        // Find the user in the database based on the user ID
        const user = await User.findOne({_id: userId}).
        select("-password");
        // console.log(`user isss ${user}`);
        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400})
        
    }
}