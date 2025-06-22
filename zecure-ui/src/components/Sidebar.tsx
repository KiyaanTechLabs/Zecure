// src/components/Sidebar.tsx
import React from "react";
import Link from "next/link";
import "@/styles/globals.scss";

export default function Sidebar() {
  return (
    <aside className="zecure-sidebar">
      <div className="sidebar-title">🔐 Zecure</div>
      <nav>
        <ul>
          <li><Link href="/dashboard">📊 Dashboard</Link></li>
          <li><Link href="/dashboard/scans">🧠 Scans</Link></li>
          <li><Link href="/dashboard/copilot">🤖 Copilot</Link></li>
          <li><Link href="/dashboard/settings">⚙️ Settings</Link></li>
        </ul>
      </nav>
    </aside>
  );
}