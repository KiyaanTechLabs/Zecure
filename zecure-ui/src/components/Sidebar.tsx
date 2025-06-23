// components/Sidebar.tsx
'use client';
import styles from '@/styles/Sidebar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiShield, FiGrid, FiSearch, FiSettings, FiCpu } from 'react-icons/fi';
import React from 'react';

const navItems = [
  { name: 'Dashboard', icon: <FiGrid />, path: '/dashboard' },
  { name: 'Scans', icon: <FiSearch />, path: '/dashboard/scans' },
  { name: 'Settings', icon: <FiSettings />, path: '/dashboard/settings' },
  { name: 'Zecure Copilot', icon: <FiCpu />, path: '/dashboard/copilot' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <FiShield size={20} />
        <span>Zecure</span>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}