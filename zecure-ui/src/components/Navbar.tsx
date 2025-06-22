// components/Navbar.tsx
import styles from '@/styles/Navbar.module.scss';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.title}>Zecure Dashboard</div>
      <div className={styles.user}>👤 Admin</div>
    </div>
  );
}