"use client";
import Image from "next/image";
import { useContext } from "react";
import { votingContext } from "@/context/Voter";

export default function Home() {
  const { title } = useContext(votingContext);
  return (
  <div>
    <h1>{title}</h1>
  </div>
  );
}
