import styles from "@/styles/Navbar.module.scss";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarTitle}>Zecure Dashboard</div>
      <div className={styles.navbarRight}>👤 Admin</div>
    </div>
  );
}