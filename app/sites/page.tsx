"use client";
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

export default function SiteDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-base-200 p-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        Construction Sites
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sites.map((site) => (
          <div
            key={site.id}
            className="card shadow-lg bg-slate-400 text-primary-content cursor-pointer"
            onClick={() => router.push(`/sites/${site.id}`)}
          >
            <div className="card-body">
              <img src="" alt="site image" className="h-48" />
              <h2 className="card-title">{site.name}</h2>
              <p>{site.description}</p>
              <p>Address: {site.address}</p>
            </div>
          </div>
        ))}
        <div className="card shadow-md border-dashed border-4 border-slate-400 text-primary-content cursor-pointer flex items-center align-center h-full ">
          <div className="card-body">
            <img src="./plus.png" alt="" className="w-full" />
            <h1 className="card-title justify-center">Add New Project</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
