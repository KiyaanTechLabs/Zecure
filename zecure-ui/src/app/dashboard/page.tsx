'use client';
import styles from '@/styles/Dashboard.module.scss';

export default function DashboardPage() {
  const threatStats = [
    { label: 'Active Threats', value: '3', status: 'danger', trend: '+2' },
    { label: 'Vulnerabilities', value: '12', status: 'warning', trend: '-4' },
    { label: 'Security Score', value: '87%', status: 'success', trend: '+5%' },
    { label: 'Last Scan', value: '2h ago', status: 'info', trend: 'Recent' }
  ];

  return (
    <main className={styles.mainContent} style={{ height: '100vh', overflowY: 'auto' }}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Security Dashboard</h1>
            <p>Monitor your security posture and manage threats in real-time</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.scanButton}>
              <span className={styles.scanIcon}>⚡</span>
              Run Full Scan
            </button>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <section className={styles.statsGrid}>
        {threatStats.map((stat, index) => (
          <div key={index} className={`${styles.statCard} ${styles[stat.status]}`}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={`${styles.statTrend} ${styles[stat.status]}`}>{stat.trend}</span>
            </div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statIndicator}></div>
          </div>
        ))}
      </section>

      {/* Content Grid */}
      <section className={styles.contentGrid}>
        {/* Recent Activity */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Recent Activity</h3>
            <button className={styles.viewAllBtn}>View All</button>
          </div>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>🔍</div>
              <div className={styles.activityContent}>
                <span className={styles.activityTitle}>Security scan completed</span>
                <span className={styles.activityTime}>2 minutes ago</span>
              </div>
              <div className={styles.activityStatus}>✅</div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>⚠️</div>
              <div className={styles.activityContent}>
                <span className={styles.activityTitle}>High-risk vulnerability detected</span>
                <span className={styles.activityTime}>15 minutes ago</span>
              </div>
              <div className={styles.activityStatus}>🔴</div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>🛡️</div>
              <div className={styles.activityContent}>
                <span className={styles.activityTitle}>Firewall rules updated</span>
                <span className={styles.activityTime}>1 hour ago</span>
              </div>
              <div className={styles.activityStatus}>✅</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Quick Actions</h3>
          </div>
          <div className={styles.quickActions}>
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>🔍</span>
              <span>Network Scan</span>
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>📊</span>
              <span>Generate Report</span>
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>🔒</span>
              <span>Update Policies</span>
            </button>
            <button className={styles.actionBtn}>
              <span className={styles.actionIcon}>⚡</span>
              <span>Emergency Lock</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}