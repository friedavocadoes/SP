"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="hero bg-base-200 min-h-screen -mt-14">
        <div className="hero-content flex-col">
          <div className="text-center align-center">
            <h1 className="text-5xl font-bold text-center">Sign Up</h1>
            <p className="pt-4 text-center">
              Create an Account to keep track of your projects!
            </p>
          </div>
          <div className="card bg-base-100 w-[120%] shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label" htmlFor="name">
                  <span className="label-text">Name</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  placeholder="name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="email"
                  type="text"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="password"
                  className="input input-bordered"
                />
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>
              <div className="form-control mt-6">
                <Link href="/">
                  <button onClick={onSignup} className="btn btn-primary">
                    Sign Up
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
