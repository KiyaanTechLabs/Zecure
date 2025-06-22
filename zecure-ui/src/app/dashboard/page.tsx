import styles from "@/styles/Dashboard.module.scss";

export default function DashboardHome() {
  return (
    <div className={styles.dashboard}>
      <h1>📊 Zecure Dashboard</h1>
      <p>Run scans, view threat reports, and manage your security posture.</p>
    </div>
  );
}