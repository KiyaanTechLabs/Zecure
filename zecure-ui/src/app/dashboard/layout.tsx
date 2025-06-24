import Sidebar from '@/components/Sidebar';
import styles from '@/styles/Dashboard.module.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
}