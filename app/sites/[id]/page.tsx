"use client";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";

interface Materials {
  materialType: String;
  quantity: number;
  deliveryDate: String;
}

const sampleMaterials = [
  { materialType: "Bricks", quantity: 100, deliveryDate: "2024-09-22" },
  { materialType: "Cement", quantity: 50, deliveryDate: "2024-09-23" },
  { materialType: "Sand", quantity: 200, deliveryDate: "2024-09-24" },
];

const sampleSummary = {
  totalQuantity: 350,
  totalCost: 1500,
};

export default function SiteDetails({ params }: { params: { id: String } }) {
  const id = params.id;
  const [materials, setMaterials] = useState<Materials[]>(sampleMaterials);
  const [summary, setSummary] = useState<any>(sampleSummary);
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [filteredLogs, setFilteredLogs] = useState<Materials[]>([]);

  useEffect(() => {
    if (id) {
      // Example API calls to fetch materials and summary
      // fetch(`/api/materials?siteId=${id}`).then(setMaterials);
      // fetch(`/api/materials/summary?siteId=${id}`).then(setSummary);
    }
  }, [id]);

  // Filter logs by selected date range
  useEffect(() => {
    if (selectedDateRange) {
      const [start, end] = selectedDateRange;
      const filtered = materials.filter((log) => {
        const logDate = new Date(log.deliveryDate).getTime();
        return (
          logDate >= new Date(start).getTime() &&
          logDate <= new Date(end).getTime()
        );
      });
      setFilteredLogs(filtered);
    }
  }, [selectedDateRange, materials]);

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
            Site {id} - Downtown Project
          </h1>
          <p className="text-xl mb-2">Managed by: Arun Mohan</p>
          <p className="text-lg mb-2">Location: African Peninsula</p>
          <p className="text-lg">
            Description: This project involves the construction of a multi-story
            residential building in the downtown area.
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-base-200 p-10 pt-8">
        {/* Back Link */}
        <div className="mb-5 -ml-4 text-primary hover:text-accent transition duration-3 ease-in-out">
          <Link href="/sites">&lt; Back to Dashboard</Link>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Daily Logs & Add Log Form */}
          <div className="col-span-2 space-y-6">
            {/* Daily Material Log */}
            <div className="card bg-secondary shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Daily Material Logs</h2>
                <ul className="list-disc list-inside">
                  {materials.map((material, idx) => (
                    <li key={idx} className="mb-2">
                      <div className="flex justify-between">
                        <span>
                          {material.materialType} - {material.quantity} units on{" "}
                          {material.deliveryDate}
                        </span>
                        <button className="btn btn-sm btn-info">Edit</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Add New Daily Log */}
            <div className="card bg-primary shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Log Today's Materials</h2>
                <div className="form-control mb-4">
                  <label className="label">Material Type</label>
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="e.g., Bricks"
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">Quantity</label>
                  <input
                    type="number"
                    className="input input-bordered"
                    placeholder="e.g., 100"
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">Delivery Date</label>
                  <input type="date" className="input input-bordered" />
                </div>
                <button className="btn btn-accent">Add Log</button>
              </div>
            </div>
          </div>

          {/* Right Column - Calendar & Date Range Filter */}
          <div>
            {/* Calendar */}
            <div className="card bg-accent shadow-xl mb-6">
              <div className="card-body">
                <h2 className="card-title">Material Delivery Calendar</h2>
                <Calendar
                  value={materials.map((mat) => mat.deliveryDate)}
                  multiple
                  className="z-1"
                />
              </div>
            </div>

            {/* Date Range Picker & Summary Table */}
            <div className="card bg-neutral shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Select Date Range</h2>
                <DatePicker
                  value={selectedDateRange}
                  onChange={setSelectedDateRange}
                  range
                />

                {selectedDateRange && (
                  <div className="mt-6">
                    <h3 className="text-lg font-bold mb-4">
                      Summary for Selected Range
                    </h3>
                    {filteredLogs.length > 0 ? (
                      <table className="table-auto w-full">
                        <thead>
                          <tr>
                            <th className="px-4 py-2">Material Type</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Delivery Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredLogs.map((log, idx) => (
                            <tr key={idx}>
                              <td className="border px-4 py-2">
                                {log.materialType}
                              </td>
                              <td className="border px-4 py-2">
                                {log.quantity}
                              </td>
                              <td className="border px-4 py-2">
                                {log.deliveryDate}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No logs found for the selected date range.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
