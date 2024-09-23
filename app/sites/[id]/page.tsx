"use client";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Materials {
  materialType: String;
  quantity: number;
  deliveryDate: String;
}

export default function SiteDetails({ params }: { params: { id: String } }) {
  const id = params.id;
  const [materials, setMaterials] = useState<Materials[]>([]);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Fetch site-specific materials and summary here
      // Example fetch functions can be written to call your API
      // fetch(`/api/materials?siteId=${id}`).then(setMaterials);
      // fetch(`/api/materials/summary?siteId=${id}`).then(setSummary);
    }
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-base-200 p-10 pt-8">
        <div className="mb-5 -ml-4 text-primary hover:text-accent transition duration-3 ease-in-out">
          <Link href="/sites">&lt; Back to Dashboard</Link>
        </div>

        <h1 className="text-4xl font-bold mb-8">Site {id} Details</h1>

        {/* Daily Material Log */}
        <div className="card bg-secondary shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title">Daily Material Logs</h2>
            <ul className="list-disc list-inside">
              {materials.map((material, idx) => (
                <li key={idx}>
                  {material.materialType} - {material.quantity} units on{" "}
                  {material.deliveryDate}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="card bg-accent shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Monthly Summary</h2>
            {summary ? (
              <p>
                Total Quantity: {summary.totalQuantity}, Total Cost: $
                {summary.totalCost}
              </p>
            ) : (
              <p>Loading summary...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
