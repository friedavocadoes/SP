"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function Navbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      setData(res.data.data.name);
      setLoading(false);
    } catch {
      setLoading(false);
      console.log("i cant fetch");
    }
  };

  const logout = async () => {
    try {
      const stat = await axios.get("/api/users/logout");
      // router.push("/");
      router.replace("/");
      router.refresh();
    } catch {
      console.log("couldnt log out");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <div className="navbar sticky top-0 z-[1000] bg-base-300 bg-opacity-30 backdrop-filter backdrop-blur-lg sm:px-8 md:px-40">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl">
            SP
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>{/* <a>Link</a> */}</li>

            {loading ? (
              <>
                <li>
                  <div
                    role="status"
                    className="flex items-center justify-center h-9 max-w-sm bg-base-300 rounded-md animate-pulse"
                  >
                    <svg
                      className="w-16"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    ></svg>
                  </div>
                </li>
              </>
            ) : data ? (
              <li>
                <details>
                  <summary>{data}</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <button onClick={logout}>Logout</button>
                    </li>
                    {/* <li>
                      <a>Link 2</a>
                    </li> */}
                  </ul>
                </details>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/login">Log in</Link>
                </li>
                <li>
                  <Link href="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
