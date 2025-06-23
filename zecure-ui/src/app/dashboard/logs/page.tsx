'use client';
import styles from '@/styles/Scans.module.scss';

export default function ScansPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🧠 Logs</h1>
      <p className={styles.subheading}>View past scans and schedule new ones.</p>
      <button className={styles.primaryButton}>Start New Scan</button>
    </div>
  );
}