"use client";
import React from "react";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface Materials {
  materialType: String;
  quantity: number;
  deliveryDate: String;
  cost: number;
}

const sampleMaterials = [
  { materialType: "Sample", quantity: 0, deliveryDate: "2024-09-22", cost: 0 },
];

export default function SiteDetails({ params }: { params: { id: number } }) {
  const id = params.id;
  const [materials, setMaterials] = useState<Materials[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [filteredLogs, setFilteredLogs] = useState<Materials[]>([]);
  const [groupedMaterials, setGroupedMaterials] = useState<
    Record<string, Materials[]>
  >({});
  const [parentInfo, setParentInfo] = useState({
    projectName: "",
    location: "",
    description: "",
  });
  const [manager, setManager] = useState("");
  const searchParams = useSearchParams();

  // Add a Log vars
  const [materialType, setMaterialType] = useState("");
  const [quantity, setQuantity] = useState<Number>();
  const [cost, setCost] = useState<Number>();
  const [deliveryDate, setDeliveryDate] = useState<Date>();

  const getManager = async () => {
    const uData = await axios.get("/api/users/me");
    const name = uData.data.data.name;
    return name;
  };

  const infoSetter = async () => {
    const uname = await getManager();
    setManager(uname);
    if (id) {
      const dataString = searchParams.get("data");
      if (dataString) {
        const result = JSON.parse(dataString);
        console.log(result);
        setParentInfo(result);
        setMaterials(result.dailyLogs);
      }
    }
  };

  const addLog = async () => {
    const uData = await axios.get("/api/users/me");
    const email = uData.data.data.email;

    const log = {
      email: email,
      index: id,
      materialType,
      quantity,
      cost,
      deliveryDate,
    };

    await axios.post("/api/project/logAdd", log);
    setCost(0);
    setQuantity(0);
    setMaterialType("");
  };

  useEffect(() => {
    infoSetter();
  }, [id]);

  useEffect(() => {
    const groupByDate = (materials: Materials[]) => {
      return materials.reduce((acc, material) => {
        const date = material.deliveryDate.substring(0, 10);
        if (!acc[date]) acc[date] = [];
        acc[date].push(material);
        return acc;
      }, {} as Record<string, Materials[]>);
    };

    // Set groupedMaterials whenever the materials state changes
    setGroupedMaterials(groupByDate(materials));
  }, [materials]);

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
            Site {id} - {parentInfo.projectName}
          </h1>
          <p className="text-xl mb-2">Managed by: {manager}</p>
          <p className="text-lg mb-2">Location: {parentInfo.location}</p>
          <p className="text-lg">Description: {parentInfo.description}</p>
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
                {/* <ul className="list-disc list-inside">

                  {materials.map((material, idx) => (
                    <li key={idx} className="mb-2">
                      <div className="flex justify-between">
                        <span>
                          {material.materialType} - {material.quantity} units on{" "}
                          {material.deliveryDate.substring(
                            0,
                            material.deliveryDate.length - 14
                          )}{" "}
                          Cost: {material.cost}
                        </span>
                        <button className="btn btn-sm btn-info">Edit</button>
                      </div>
                    </li>
                  ))}
                </ul> */}

                <ul className="list-disc list-inside">
                  {Object.entries(groupedMaterials).map(([date, materials]) => (
                    <li key={date} className="mb-4">
                      <div className="font-bold text-lg mb-2">{date}</div>
                      <ul className="ml-4">
                        {materials.map((material, idx) => (
                          <li key={idx} className="mb-2">
                            <div className="flex justify-between">
                              <span>
                                {material.materialType} - {material.quantity}{" "}
                                units - Cost: {material.cost}
                              </span>
                              <button className="btn btn-sm btn-info">
                                Edit
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
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
                    value={materialType}
                    onChange={(e) => {
                      setMaterialType(e.target.value);
                    }}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">Quantity</label>
                  <input
                    type="number"
                    className="input input-bordered"
                    placeholder="e.g., 100"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(Number(e.target.value));
                    }}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">Cost</label>
                  <input
                    type="number"
                    className="input input-bordered"
                    placeholder="Total cost (in INR)"
                    value={cost}
                    onChange={(e) => {
                      setCost(Number(e.target.value));
                    }}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">Delivery Date</label>
                  <input
                    type="date"
                    className="input input-bordered"
                    onChange={(e) => {
                      setDeliveryDate(Date(e.target.value));
                    }}
                  />
                </div>
                <button className="btn btn-accent" onClick={addLog}>
                  Add Lasdasdadsog
                </button>
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
