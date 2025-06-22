import styles from "@/styles/Sidebar.module.scss";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTitle}>🔐 Zecure</div>
      <nav>
        <Link href="/dashboard" className={styles.link}>📊 Dashboard</Link>
        <Link href="/dashboard/scans" className={styles.link}>🧠 Scans</Link>
        <Link href="/dashboard/copilot" className={styles.link}>🤖 Copilot</Link>
        <Link href="/dashboard/settings" className={styles.link}>⚙️ Settings</Link>
      </nav>
    </aside>
  );
}