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

  // Toggle Archive status of a project
  const toggleArchive = async (val: boolean) => {
    const email = await getEmail();
    const datan = {
      email: email,
      index: id,
      status: val,
    };

    await axios.post("/api/project/archive", datan);
    await infoSetter();
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
          {projectDetails?.archived && (
            <>
              <div className="mb-3 text-red-500">
                This project is archived, unarchive to view in your dashboard.
              </div>
            </>
          )}
          <h1 className="text-5xl font-bold mb-4">
            {projectDetails?.projectName}
          </h1>
          <p className="text-lg mb-2">Location: {projectDetails?.location}</p>
          <p className="text-lg">Description: {projectDetails?.description}</p>
          {projectDetails?.archived ? (
            <>
              <div className="mt-10 -mb-10">
                <button
                  className="btn bg-green-700 rounded-md "
                  onClick={() => {
                    toggleArchive(false);
                  }}
                >
                  Unarchive
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mt-10 -mb-10">
                <button
                  className="btn bg-red-700 rounded-md "
                  onClick={() => {
                    toggleArchive(true);
                  }}
                >
                  Archive
                </button>
              </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8"></div>
    </>
  );
}

export default p2;
