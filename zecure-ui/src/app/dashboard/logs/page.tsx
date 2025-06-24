'use client';

import { useState, useMemo } from 'react';
import styles from '@/styles/Logs.module.scss';

interface LogEntry {
  id: number;
  time: string;
  user: string;
  event: string;
  ip: string;
  status: 'Success' | 'Failed' | 'Completed' | 'Saved' | 'Warning' | 'Error';
  eventType: 'login' | 'scan' | 'settings' | 'security' | 'system';
  severity: 'info' | 'warning' | 'alert';
}

const mockLogs: LogEntry[] = [
  {
    id: 1,
    time: '2025-06-24 11:03 AM',
    user: 'samarth@zecure.ai',
    event: 'Logged in',
    ip: '192.168.1.12',
    status: 'Success',
    eventType: 'login',
    severity: 'info'
  },
  {
    id: 2,
    time: '2025-06-24 11:05 AM',
    user: 'soham@zecure.ai',
    event: 'Ran full scan',
    ip: '192.168.1.12',
    status: 'Completed',
    eventType: 'scan',
    severity: 'info'
  },
  {
    id: 3,
    time: '2025-06-24 11:08 AM',
    user: 'taran@zecure.ai',
    event: 'Modified firewall config',
    ip: '192.168.1.12',
    status: 'Saved',
    eventType: 'settings',
    severity: 'warning'
  },
  {
    id: 4,
    time: '2025-06-24 10:45 AM',
    user: 'smitha@zecure.ai',
    event: 'Failed login attempt',
    ip: '203.0.113.42',
    status: 'Failed',
    eventType: 'login',
    severity: 'alert'
  },
  {
    id: 5,
    time: '2025-06-24 10:30 AM',
    user: 'hariharan@zecure.ai',
    event: 'Generated security report',
    ip: '192.168.1.12',
    status: 'Completed',
    eventType: 'security',
    severity: 'info'
  },
  {
    id: 6,
    time: '2025-06-24 10:15 AM',
    user: 'riya.mehra@zecure.ai',
    event: 'Updated user permissions',
    ip: '192.168.1.25',
    status: 'Saved',
    eventType: 'settings',
    severity: 'warning'
  },
  {
    id: 7,
    time: '2025-06-24 09:45 AM',
    user: 'manoj.kumar@zecure.ai',
    event: 'System backup initiated',
    ip: '192.168.1.12',
    status: 'Completed',
    eventType: 'system',
    severity: 'info'
  },
  {
    id: 8,
    time: '2025-06-24 09:30 AM',
    user: 'security@zecure.ai',
    event: 'Vulnerability scan completed',
    ip: '192.168.1.50',
    status: 'Warning',
    eventType: 'scan',
    severity: 'warning'
  }
];

export default function AccessLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState('today');
  const [isLiveStream, setIsLiveStream] = useState(true);

  const filteredLogs = useMemo(() => {
    return mockLogs.filter(log => {
      const matchesSearch = !searchTerm || 
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip.includes(searchTerm);
      
      const matchesEventType = eventTypeFilter === 'all' || log.eventType === eventTypeFilter;
      const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
      
      return matchesSearch && matchesEventType && matchesSeverity;
    });
  }, [searchTerm, eventTypeFilter, severityFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Success': return '✅';
      case 'Failed': return '❌';
      case 'Completed': return '⚡';
      case 'Saved': return '⚙️';
      case 'Warning': return '⚠️';
      case 'Error': return '🚨';
      default: return '📋';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'alert': return '🔒';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '';
    }
  };

  const getUserInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.split('.').map(part => part[0]).join('').toUpperCase().slice(0, 2);
  };

  const exportLogs = (format: 'csv' | 'json') => {
    const dataStr = format === 'json' 
      ? JSON.stringify(filteredLogs, null, 2)
      : [
          'Time,User,Event,IP Address,Status,Event Type,Severity',
          ...filteredLogs.map(log => 
            `${log.time},"${log.user}","${log.event}",${log.ip},${log.status},${log.eventType},${log.severity}`
          )
        ].join('\n');
    
    const dataBlob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `access-logs-${Date.now()}.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.logsContainer}>
      {/* Page Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>
              <span className={styles.titleIcon}>📜</span>
              Access Logs
            </h1>
            <p className={styles.subtitle}>
              Track user activity, platform usage, and security-sensitive events.
            </p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.liveIndicator}>
              <span className={`${styles.liveDot} ${isLiveStream ? styles.active : ''}`}></span>
              <span className={styles.liveText}>
                {isLiveStream ? 'Live' : 'Paused'}
              </span>
              <button 
                className={styles.toggleButton}
                onClick={() => setIsLiveStream(!isLiveStream)}
              >
                {isLiveStream ? 'Pause' : 'Resume'}
              </button>
            </div>
            <div className={styles.exportButtons}>
              <button 
                className={styles.exportBtn}
                onClick={() => exportLogs('csv')}
              >
                📊 Export CSV
              </button>
              <button 
                className={styles.exportBtn}
                onClick={() => exportLogs('json')}
              >
                📄 Export JSON
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={styles.filtersSection}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search by user, event, or IP address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.filters}>
          <select 
            value={eventTypeFilter} 
            onChange={(e) => setEventTypeFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Events</option>
            <option value="login">Login</option>
            <option value="scan">Scan</option>
            <option value="settings">Settings</option>
            <option value="security">Security</option>
            <option value="system">System</option>
          </select>

          <select 
            value={severityFilter} 
            onChange={(e) => setSeverityFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Severity</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="alert">Alert</option>
          </select>

          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.resultsCount}>
            Showing {filteredLogs.length} of {mockLogs.length} logs
          </div>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHead}>
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>Time</div>
              <div className={styles.tableCell}>User</div>
              <div className={styles.tableCell}>Event</div>
              <div className={styles.tableCell}>IP Address</div>
              <div className={styles.tableCell}>Status</div>
            </div>
          </div>
          
          <div className={styles.tableBody}>
            {filteredLogs.map((log) => (
              <div 
                key={log.id} 
                className={`${styles.tableRow} ${styles[log.severity]}`}
              >
                <div className={styles.tableCell}>
                  <div className={styles.timeCell}>
                    <span className={styles.timeIcon}>🕐</span>
                    {log.time}
                  </div>
                </div>
                
                <div className={styles.tableCell}>
                  <div className={styles.userCell}>
                    <div className={styles.userAvatar}>
                      {getUserInitials(log.user)}
                    </div>
                    <span className={styles.userEmail}>{log.user}</span>
                  </div>
                </div>
                
                <div className={styles.tableCell}>
                  <div className={styles.eventCell}>
                    <span className={styles.severityIcon}>
                      {getSeverityIcon(log.severity)}
                    </span>
                    {log.event}
                  </div>
                </div>
                
                <div className={styles.tableCell}>
                  <div className={styles.ipCell}>
                    <span className={styles.ipIcon}>🌐</span>
                    {log.ip}
                  </div>
                </div>
                
                <div className={styles.tableCell}>
                  <div className={`${styles.statusBadge} ${styles[log.status.toLowerCase()]}`}>
                    <span className={styles.statusIcon}>
                      {getStatusIcon(log.status)}
                    </span>
                    {log.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredLogs.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3>No logs found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button className={styles.paginationBtn} disabled>
          ← Previous
        </button>
        <span className={styles.paginationInfo}>
          Page 1 of 1
        </span>
        <button className={styles.paginationBtn} disabled>
          Next →
        </button>
      </div>
    </div>
  );
}