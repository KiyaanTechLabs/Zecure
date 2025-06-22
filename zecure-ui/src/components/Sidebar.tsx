"use client";

export default function Sidebar() {
  return (
    <aside style={{
      width: "200px",
      backgroundColor: "#0d0d0d",
      height: "100vh",
      padding: "1rem",
      color: "#fff",
      borderRight: "1px solid #333"
    }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>📊 Dashboard</li>
        <li>🧠 Scans</li>
        <li>🛠️ Settings</li>
      </ul>
    </aside>
  );
}