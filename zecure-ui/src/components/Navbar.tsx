"use client";

import styles from "@/styles/Navbar.module.scss";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarTitle}>
        <button onClick={() => router.push('/')} className={styles.homeButton}>
          🏠
        </button>
        Zecure Dashboard
      </div>
      <div className={styles.navbarRight}>👤 Admin</div>
    </div>
  );
}