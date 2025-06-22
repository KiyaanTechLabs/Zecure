// src/components/Navbar.tsx
import React from "react";
import "@/styles/globals.scss";

export default function Navbar() {
  return (
    <header className="zecure-navbar">
      <div className="navbar-title">Welcome back 👋</div>
      <div className="navbar-right">
        <span>samarth@zecure.com</span>
      </div>
    </header>
  );
}