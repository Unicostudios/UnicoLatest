import React from "react";
import logo from "../assets/unicologo.svg";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={logo} alt="UNICO" className="h-10" />
    </div>
  );
}
