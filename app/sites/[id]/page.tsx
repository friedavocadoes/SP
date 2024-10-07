"use client";
import axios from "axios";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";

interface Materials {
  materialType: String;
  quantity: number;
  deliveryDate: String;
  cost: number;
}

interface Project {
  archived: Boolean;
  dailyLogs: [];
  description: String;
  location: String;
  projectName: String;
}

function p2({ params }: { params: { id: number } }) {
  const id = params.id;
  const [projectDetails, setProjectDetails] = useState<Project>();

  const getEmail = async () => {
    const uData = await axios.get("/api/users/me");
    const email = uData.data.data.email;
    return email;
  };

  // Set the current project details from cookie data
  const infoSetter = async () => {
    const email = await getEmail();
    const response = await axios.post("/api/project/fetch", { email });
    const check = response.data.data.projects[id];
    setProjectDetails(check);
  };

  useEffect(() => {
    infoSetter();
  }, []);

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "./site-def.jpeg" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">
            Site {id} - {projectDetails?.projectName}
          </h1>
          <p className="text-lg mb-2">Location: {projectDetails?.location}</p>
          <p className="text-lg">Description: {projectDetails?.description}</p>
          {projectDetails?.archived ? (
            <>
              <div>This project is Archived</div>
            </>
          ) : (
            <>
              <div>This project is not archived</div>
            </>
          )}
        </div>
      </div>

      <div className="min-h-screen bg-base-200 p-10 pt-8">
        {/* Back Link */}
        <div className="mb-5 -ml-4 text-primary hover:text-accent transition duration-3 ease-in-out">
          <Link href="/sites">&lt; Back to Dashboard</Link>
        </div>
      </div>

      {/* Content Section */}
    </>
  );
}

export default p2;
