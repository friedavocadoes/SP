"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

const sites = [
  {
    id: 1,
    name: "Site A",
    description: "Downtown project",
    address: "African Peninsula",
  },
  {
    id: 2,
    name: "Site B",
    description: "Mall construction",
    address: "Murica",
  },
];

const siteImage = "./site-def.jpeg";

export default function SiteDashboard() {
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [projectList, setProjectList] = useState(sites); // Initial project list state

  const router = useRouter();

  // Function to handle form submission
  const handleAddProject = () => {
    const newProject = {
      id: uuidv4(), // Generate a unique ID for the new project
      name: projectName,
      description: projectDescription,
      address: projectAddress,
    };

    setProjectList([...projectList, newProject]); // Update project list with new project
    setShowModal(false); // Close the modal after adding project
    setProjectName(""); // Reset input fields
    setProjectDescription("");
    setProjectAddress("");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 p-10">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          Your Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* "Add New Project" Card */}
          <div
            className="card shadow-md border-dashed border-4 border-accent text-primary-content cursor-pointer flex items-center align-center h-full"
            onClick={() => {
              console.log("Add New Project clicked");
              setShowModal(true); // Open modal on click
            }}
          >
            <div className="card-body">
              <img
                src="./plus.png"
                alt=""
                className="w-[80%] justify-center mx-auto"
              />
              <h1 className="card-title justify-center text-secondary">
                Add New Project
              </h1>
            </div>
          </div>
          {projectList.map((site) => (
            <div
              key={site.id}
              className="card shadow-lg bg-neutral text-primary-content cursor-pointer"
              onClick={() => router.push(`/sites/${site.id}`)}
            >
              <div className="card-body -m-2">
                <img
                  src={siteImage}
                  alt="site image"
                  className="h-48 rounded-sm"
                />
                <h2 className="card-title text-accent">{site.name}</h2>
                <p className="text-secondary">{site.description}</p>
                <p className="text-secondary">
                  <span className="font-bold text-primary">Address:</span>{" "}
                  {site.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Adding a New Project */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="modal-box bg-base-100 text-primary-content">
            <h3 className="font-bold text-lg">Add New Project</h3>
            <div className="py-4">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Project Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter project name"
                  className="input input-bordered"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  placeholder="Enter project description"
                  className="textarea textarea-bordered"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter project address"
                  className="input input-bordered"
                  value={projectAddress}
                  onChange={(e) => setProjectAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-accent"
                onClick={handleAddProject} // Add new project on click
              >
                Add Project
              </button>
              <button
                className="btn btn-error"
                onClick={() => setShowModal(false)} // Close modal on click
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
