'use client';
import styles from '@/styles/Settings.module.scss';

export default function SettingsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🛠️ Settings</h1>
      <p className={styles.subheading}>Customize your preferences and configurations.</p>
      <div className={styles.card}>
        <label htmlFor="email">Notification Email</label>
        <input id="email" type="email" placeholder="your@email.com" />
      </div>
    </div>
  );
}