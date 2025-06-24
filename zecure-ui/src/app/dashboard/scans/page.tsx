'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/Scans.module.scss';

interface Scan {
  id: string;
  date: string;
  target: string;
  duration: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Clean' | 'Warning' | 'Critical' | 'Failed' | 'Running';
  issuesFound: number;
  filesScanned: number;
}

export default function ScansPage() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockScans: Scan[] = [
      {
        id: '1',
        date: '2025-06-22',
        target: '/src',
        duration: '2m 43s',
        riskLevel: 'High',
        status: 'Critical',
        issuesFound: 15,
        filesScanned: 234
      },
      {
        id: '2',
        date: '2025-06-20',
        target: '/api',
        duration: '3m 10s',
        riskLevel: 'Medium',
        status: 'Warning',
        issuesFound: 7,
        filesScanned: 156
      },
      {
        id: '3',
        date: '2025-06-18',
        target: '/components',
        duration: '1m 55s',
        riskLevel: 'Low',
        status: 'Clean',
        issuesFound: 0,
        filesScanned: 89
      },
      {
        id: '4',
        date: '2025-06-15',
        target: '/utils',
        duration: '4m 22s',
        riskLevel: 'Critical',
        status: 'Critical',
        issuesFound: 23,
        filesScanned: 67
      }
    ];
    setScans(mockScans);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Clean': return '✅';
      case 'Warning': return '⚠️';
      case 'Critical': return '❌';
      case 'Failed': return '💥';
      case 'Running': return '🔄';
      default: return '❓';
    }
  };

  const getRiskBadgeClass = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return styles.riskLow;
      case 'Medium': return styles.riskMedium;
      case 'High': return styles.riskHigh;
      case 'Critical': return styles.riskCritical;
      default: return styles.riskLow;
    }
  };

  const filteredScans = scans.filter(scan => {
    if (filter === 'all') return true;
    return scan.status.toLowerCase() === filter;
  });

  const handleScanClick = (scan: Scan) => {
    setSelectedScan(scan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedScan(null);
  };

  const startNewScan = () => {
    // Add new scan logic here
    console.log('Starting new scan...');
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.heading}>🧠 Scan Reports</h1>
          <p className={styles.subheading}>View past scans and schedule new ones.</p>
        </div>
        <button className={styles.primaryButton} onClick={startNewScan}>
          🔘 Start New Scan
        </button>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        <button 
          className={`${styles.filterTab} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
        >
          All Scans
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'clean' ? styles.active : ''}`}
          onClick={() => setFilter('clean')}
        >
          Clean
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'warning' ? styles.active : ''}`}
          onClick={() => setFilter('warning')}
        >
          Warnings
        </button>
        <button 
          className={`${styles.filterTab} ${filter === 'critical' ? styles.active : ''}`}
          onClick={() => setFilter('critical')}
        >
          Critical
        </button>
      </div>

      {/* Main Content */}
      {scans.length === 0 ? (
        /* Empty State */
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3>No scans yet</h3>
          <p>You haven't run any scans yet. Start your first security scan to detect vulnerabilities in your codebase.</p>
          <button className={styles.emptyStateButton} onClick={startNewScan}>
            Run Your First Scan
          </button>
        </div>
      ) : (
        <>
          {/* Scan Summary Grid */}
          <div className={styles.scanGrid}>
            {filteredScans.map((scan) => (
              <div 
                key={scan.id} 
                className={styles.scanCard}
                onClick={() => handleScanClick(scan)}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.scanDate}>{scan.date}</span>
                  <span className={styles.statusIcon}>
                    {getStatusIcon(scan.status)}
                  </span>
                </div>
                
                <div className={styles.cardContent}>
                  <h3 className={styles.scanTarget}>{scan.target}</h3>
                  <div className={styles.scanMeta}>
                    <span className={styles.duration}>⏱️ {scan.duration}</span>
                    <span className={`${styles.riskBadge} ${getRiskBadgeClass(scan.riskLevel)}`}>
                      {scan.riskLevel}
                    </span>
                  </div>
                  
                  <div className={styles.scanStats}>
                    <div className={styles.stat}>
                      <span className={styles.statValue}>{scan.issuesFound}</span>
                      <span className={styles.statLabel}>Issues</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statValue}>{scan.filesScanned}</span>
                      <span className={styles.statLabel}>Files</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.cardFooter}>
                  <span className={`${styles.status} ${styles[scan.status.toLowerCase()]}`}>
                    {scan.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Scans Table */}
          <div className={styles.tableSection}>
            <h2 className={styles.sectionTitle}>Recent Scans</h2>
            <div className={styles.tableContainer}>
              <table className={styles.scansTable}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Target</th>
                    <th>Duration</th>
                    <th>Risk Level</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScans.map((scan) => (
                    <tr key={scan.id}>
                      <td>{scan.date}</td>
                      <td className={styles.targetCell}>{scan.target}</td>
                      <td>{scan.duration}</td>
                      <td>
                        <span className={`${styles.riskBadge} ${getRiskBadgeClass(scan.riskLevel)} ${styles.small}`}>
                          {scan.riskLevel}
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[scan.status.toLowerCase()]}`}>
                          {getStatusIcon(scan.status)} {scan.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className={styles.viewButton}
                          onClick={() => handleScanClick(scan)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Scan Detail Modal */}
      {isModalOpen && selectedScan && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Scan Details</h2>
              <button className={styles.closeButton} onClick={closeModal}>×</button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.scanOverview}>
                <div className={styles.overviewItem}>
                  <label>Target:</label>
                  <span>{selectedScan.target}</span>
                </div>
                <div className={styles.overviewItem}>
                  <label>Date:</label>
                  <span>{selectedScan.date}</span>
                </div>
                <div className={styles.overviewItem}>
                  <label>Duration:</label>
                  <span>{selectedScan.duration}</span>
                </div>
                <div className={styles.overviewItem}>
                  <label>Status:</label>
                  <span className={`${styles.statusBadge} ${styles[selectedScan.status.toLowerCase()]}`}>
                    {getStatusIcon(selectedScan.status)} {selectedScan.status}
                  </span>
                </div>
                <div className={styles.overviewItem}>
                  <label>Risk Level:</label>
                  <span className={`${styles.riskBadge} ${getRiskBadgeClass(selectedScan.riskLevel)}`}>
                    {selectedScan.riskLevel}
                  </span>
                </div>
              </div>

              <div className={styles.scanResults}>
                <h3>Scan Results</h3>
                <div className={styles.resultStats}>
                  <div className={styles.resultStat}>
                    <span className={styles.statNumber}>{selectedScan.issuesFound}</span>
                    <span className={styles.statDesc}>Issues Found</span>
                  </div>
                  <div className={styles.resultStat}>
                    <span className={styles.statNumber}>{selectedScan.filesScanned}</span>
                    <span className={styles.statDesc}>Files Scanned</span>
                  </div>
                </div>
                
                {selectedScan.issuesFound > 0 && (
                  <div className={styles.issuesList}>
                    <h4>Top Issues:</h4>
                    <div className={styles.issue}>
                      <span className={styles.issueType}>🔴 SQL Injection Vulnerability</span>
                      <span className={styles.issueFile}>src/api/users.js:42</span>
                    </div>
                    <div className={styles.issue}>
                      <span className={styles.issueType}>🟡 Hardcoded API Key</span>
                      <span className={styles.issueFile}>src/config/env.js:15</span>
                    </div>
                    <div className={styles.issue}>
                      <span className={styles.issueType}>🟠 Weak Password Policy</span>
                      <span className={styles.issueFile}>src/auth/validation.js:28</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button className={styles.exportButton}>📄 Export PDF</button>
              <button className={styles.shareButton}>🔗 Share Report</button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Start Scan Button
      <button className={styles.fixedScanButton} onClick={startNewScan}>
        🔘 Start Scan
      </button> */}
    </div>
  );
}