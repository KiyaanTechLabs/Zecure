import styles from "@/styles/Home.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.landingPage}>
      <main>
        <h1>Welcome to Zecure 🔐</h1>
        <p>
          Zecure is your AI-powered security copilot for fintech and devops.
        </p>
        <ul>
          <li>🧠 Analyze code and infra</li>
          <li>🛡️ Get real-time threat insights</li>
          <li>📊 Monitor compliance automatically</li>
        </ul>
        <Link className={styles.primaryButton} href="/dashboard">
          Start Securing →
        </Link>
      </main>
    </div>
  );
}