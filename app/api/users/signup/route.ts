import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Project from "@/models/projectModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();
// Calls the connect function to establish a connection to the database.

export async function POST(request: NextRequest) {
  // Defines an asynchronous POST request handler.
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;
    // Parses the request body to extract name, email, and password.

    //Checks if a user with the provided email already exists.
    const user = await User.findOne({ email });

    //If yes, returns a 400 response.
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password using bcryptjs.
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password,
    });

    // create a project entry also(empty)
    const newProj = new Project({
      email,
      projects: [
        {
          "projectName": "Downtown Building",
          "location": "Downtown, City A",
          "description": "High-rise building project.",
          "dailyLogs": [
            {
              "materialType": "Cement",
              "quantity": 100,
              "cost": 500,
              "deliveryDate": "2024-09-27"
            },
            {
              "materialType": "Steel",
              "quantity": 50,
              "cost": 700,
              "deliveryDate": "2024-09-28"
            },
            {
              "materialType": "Bricks",
              "quantity": 50,
              "cost": 200,
              "deliveryDate": "2024-09-28"
            }
          ]
        },
        {
          "projectName": "Mall Renovation",
          "location": "Uptown, City B",
          "description": "Renovation of an old shopping mall.",
          "dailyLogs": [
            {
              "materialType": "Bricks",
              "quantity": 200,
              "cost": 300,
              "deliveryDate": "2024-09-29"
            }
          ]
        }
      ]
    });

    // Saves the new user and project to the database.
    const savedUser = await newUser.save();
    await newProj.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
