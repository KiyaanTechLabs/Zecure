// components/Sidebar.tsx
import styles from '@/styles/Sidebar.module.scss';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>Zecure</div>
      <ul className={styles.navList}>
        <li className={styles.navItem}><Link className={styles.navLink} href="/dashboard">📊 Dashboard</Link></li>
        <li className={styles.navItem}><Link className={styles.navLink} href="/dashboard/scans">🧠 Scans</Link></li>
        <li className={styles.navItem}><Link className={styles.navLink} href="/dashboard/settings">🛠️ Settings</Link></li>
        <li className={styles.navItem}><Link className={styles.navLink} href="/dashboard/copilot">🔐 Zecure Copilot</Link></li>
      </ul>
    </div>
  );
}