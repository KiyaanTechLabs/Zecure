'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
    Search,
    FileText,
    ScrollText,
    Bot,
    Settings,
    Shield,
    User
} from 'lucide-react';
import styles from '@/styles/Sidebar.module.scss';

export default function Sidebar() {
    const [currentPath, setCurrentPath] = useState<string | null>(null);

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const handleToggleProfile = () => setShowProfileMenu(!showProfileMenu);
    const handleLogout = () => {
        // Redirect to main landing page after logout
        window.location.href = "/";
    };

    const navItems = [
        { name: 'Dashboard', icon: Shield, path: '/dashboard' },
        { name: 'Scans', icon: Search, path: '/dashboard/scans' },
        { name: 'Reports', icon: FileText, path: '/dashboard/reports' },
        { name: 'Access Logs', icon: ScrollText, path: '/dashboard/logs' },
        { name: 'Zecure Copilot', icon: Bot, path: '/dashboard/copilot' },
        { name: 'Settings', icon: Settings, path: '/dashboard/settings' }
    ];

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <div className={styles.logo}>
                    <img src="/zecure.png" alt="Zecure Logo" className={styles.logoImage} />
                    <h2>Zecure</h2>
                </div>

            </div>

            <nav className={styles.nav}>
                {currentPath && navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.path;

                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                        >
                            <span className={styles.navIcon}>
                                <Icon size={18} />
                            </span>
                            <span className={styles.navText}>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.sidebarFooter}>
                <div className={styles.userProfile} onClick={handleToggleProfile}>
                    <div className={styles.avatar}>
                        <User size={16} />
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>Admin</span>
                        <span className={styles.userRole}>Security Manager</span>
                    </div>
                </div>
                {showProfileMenu && (
                    <div className={styles.profileDropdown}>
                        {/* <Link href="/dashboard/profile">View Profile</Link>
                        <Link href="/dashboard/account">Account Settings</Link>
                        <Link href="/dashboard/preferences">Preferences</Link> */}
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </aside>
    );
}