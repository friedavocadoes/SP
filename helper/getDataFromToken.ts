import jwt from 'jsonwebtoken'
import { NextRequest } from "next/server"

export const getDataFromToken = (request: NextRequest) => {

    try {
        // Retrieve the token from the cookies
        const token = request.cookies.get("token")?.value || '';
        
        // Verify and decode the token using the secret key
        const TOKEN_SECRET = "chappathi";
        const decodedToken:any = jwt.verify(token, TOKEN_SECRET!);

        // Return the user ID from the decoded token
        console.log("reached here")
        return decodedToken.id;
        // return token;
        

    } catch (error: any) {
        throw new Error("error while fetching token")
        // console.log("token dead kekw");
        
    }
}