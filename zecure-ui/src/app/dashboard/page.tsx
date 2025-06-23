'use client';

import styles from '@/styles/Dashboard.module.scss';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Zecure Dashboard 🔍</h1>
      <p className={styles.subheading}>
        Run scans, view threat reports, and manage your security posture.
      </p>
      <button className={styles.primaryButton}>Run Scan</button>
    </div>
  );
}