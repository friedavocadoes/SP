import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()
// Calls the connect function to establish a connection to the database.

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        //check if user exists
        const user = await User.findOne({email})
        console.log("user find done")

        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        
        //check if password is correct
        const validPassword = () => {
            if (password === user.password) return true;
            else return false;
        }
        //await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "Invlid password"}, {status: 400})
        }

        console.log("password check done")

//create token data
// A JavaScript object (tokenData) is created to store essential user 
// information. In this case, it includes the user's unique identifier (id), 
// name, and email.

        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        }

        // Create a token with expiration of 1 day
        const TOKEN_SECRET = "chappathi";
        const token = await jwt.sign(tokenData, TOKEN_SECRET!, {expiresIn: "1d"})
        console.log("token saved")
        // Create a JSON response indicating successful login
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        // Set the token as an HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}