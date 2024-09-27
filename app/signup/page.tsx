"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function SignupPage() {
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
      <div className="p-5 bg-base-200">
        <label htmlFor="name">Name</label>
        <br />
        <input
          id="name"
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="name"
        />
        <br />
        <br />
        <label htmlFor="email">email</label>
        <br />
        <input
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <br />
        <br />
        <label htmlFor="password">password</label>
        <br />
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <br />
        <br />
        <button onClick={onSignup}>Sign Up</button>
        <br />
        <Link href="/login">Visit login page</Link>
      </div>
    </>
  );
}
