import Link from "next/link";
import Navbar from "./components/Navbar";
import React from "react";

export default function Home() {
  return (
    <>
      <Navbar />
      <Link href="/sites/">Load Site</Link>
    </>
  );
}
