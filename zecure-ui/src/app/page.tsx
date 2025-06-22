import "@/styles/globals.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className="zecure-page">
      <main className="zecure-main">
        <h1>Welcome to Zecure 🔐</h1>
        <p>
          Zecure is your AI-powered security copilot for fintech and devops.
        </p>

        <ul style={{ marginTop: "2rem", lineHeight: "1.8" }}>
          <li>🧠 Analyze code and infra</li>
          <li>🛡️ Get real-time threat insights</li>
          <li>📊 Monitor compliance automatically</li>
        </ul>

        <Link href="/dashboard" className="zecure-primary" style={{ marginTop: "2rem", display: "inline-block" }}>
          Start Securing →
        </Link>
      </main>
    </div>
  );
}