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
  dailyLogs: Materials[];
  description: String;
  location: String;
  projectName: String;
}

function p2({ params }: { params: { id: number } }) {
  const id = params.id;
  const [projectDetails, setProjectDetails] = useState<Project>();
  const [materials, setMaterials] = useState<Materials[]>([]);
  const [groupedMaterials, setGroupedMaterials] = useState<
    Record<string, Materials[]>
  >({});

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
    setMaterials(check.dailyLogs);
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

  // To group materials
  useEffect(() => {
    const groupByDate = (materials: Materials[]) => {
      return materials.reduce((acc, material) => {
        const date = material.deliveryDate.substring(0, 10);
        if (!acc[date]) acc[date] = [];
        acc[date].push(material);
        return acc;
      }, {} as Record<string, Materials[]>);
    };

    setGroupedMaterials(groupByDate(materials));
  }, [materials]);

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

      <div className="min-h-screen bg-base-200 ">
        {/* Back Link */}
        {/* <div className="mb-5 -ml-4 text-primary hover:text-accent transition duration-3 ease-in-out">
          <Link href="/sites">&lt; Back to Dashboard</Link>
        </div> */}

        {/* Content Section */}
        {/* <ul className="list-disc list-inside">
          {Object.entries(groupedMaterials).map(([date, materials]) => (
            <li key={date} className="mb-4">
              <div className="font-bold text-lg mb-2">{date}</div>
              <ul className="ml-4">
                {materials.map((material, idx) => (
                  <li key={idx} className="mb-2">
                    <div className="flex justify-between">
                      <span>
                        {material.materialType} - {material.quantity} units -
                        Cost: {material.cost}
                      </span>
                      <button className="btn btn-sm btn-info">Edit</button>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul> */}

        <div className="grid grid-cols-4">
          <div className="col-span-3 bg-slate-500">hi</div>
          <div className="col-span-1 bg-white">hi</div>
        </div>
      </div>
    </>
  );
}

export default p2;
