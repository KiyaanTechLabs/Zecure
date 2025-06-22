"use client";
import "@/styles/globals.scss";

export default function DashboardHome() {
  return (
    <div className="zecure-page">
      <main className="zecure-main">
        <h2>Zecure Dashboard 🔍</h2>
        <p>Run scans, view threat reports, and manage your security posture.</p>

        <div style={{ marginTop: "2rem" }}>
          <button className="zecure-primary">Run Scan</button>
        </div>
      </main>
    </div>
  );
}