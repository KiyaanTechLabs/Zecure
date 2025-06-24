// app/dashboard/layout.tsx
"use client";
import Sidebar from '@/components/Sidebar';
import '@/styles/globals.scss';
import styles from '@/styles/Dashboard.module.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}