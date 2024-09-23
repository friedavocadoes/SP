"use client";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

const sites = [
  {
    id: 1,
    name: "Site A",
    description: "Downtown project",
    address: "african peninsula",
  },
  {
    id: 2,
    name: "Site B",
    description: "Mall construction",
    address: "murica",
  },
];

const siteImage = "./site-def.jpeg";
export default function SiteDashboard() {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200 p-10">
        <h1 className="text-4xl font-bold text-center text-primary mb-8">
          Your Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sites.map((site) => (
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
          <div className="card shadow-md border-dashed border-4 border-accent text-primary-content cursor-pointer flex items-center align-center h-full ">
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
        </div>
      </div>
    </>
  );
}
