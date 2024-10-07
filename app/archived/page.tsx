"use client";
import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const siteImage = "./site-def.jpeg";
const Prjt = [
  {
    projectName: "",
    description: "",
    location: "",
    archived: true,
  },
];

function page() {
  const [isLoading, setIsLoading] = useState(true);
  const [projectList, setProjectList] = useState(Prjt);

  const getEmail = async () => {
    const uData = await axios.get("/api/users/me");
    const email = uData.data.data.email;
    return email;
  };

  const showProjects = async () => {
    setIsLoading(true);
    const email = await getEmail();
    console.log(email);
    const response = await axios.post("/api/project/fetch", { email });
    console.log(response.data.data.projects);
    setProjectList(response.data.data.projects);
    setIsLoading(false);
  };

  useEffect(() => {
    showProjects();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 p-10">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          Archived Projects{" "}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              {Array(5)
                .fill(Array)
                .map((_, index) => (
                  <div
                    key={index}
                    className="card shadow-lg bg-neutral animate-pulse text-primary-content cursor-pointer"
                  >
                    <div className="card-body -m-2">
                      <div className="h-48 bg-neutral-600 rounded-sm mb-4" />
                      <div className="h-6 bg-neutral-600 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-neutral-600 rounded w-5/6 mb-1"></div>
                      <div className="h-4 bg-neutral-600 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <>
              {projectList.map(
                (site, index) =>
                  site.archived && (
                    <Link
                      href={{
                        pathname: `/sites/${index}`,
                        query: { data: JSON.stringify(projectList[index]) },
                      }}
                    >
                      <div
                        key={index}
                        className="card shadow-lg bg-neutral text-primary-content cursor-pointer"
                      >
                        <div className="card-body -m-2">
                          <img
                            src={siteImage}
                            alt="site image"
                            className="h-48 rounded-sm"
                          />
                          <h2 className="card-title text-accent">
                            {site.projectName}
                          </h2>
                          <p className="text-secondary">{site.description}</p>
                          <p className="text-secondary">
                            <span className="font-bold text-primary">
                              Address:
                            </span>{" "}
                            {site.location}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default page;
