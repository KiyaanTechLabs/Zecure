'use client';
import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import styles from '@/styles/Reports.module.scss';

// Mock data for demonstration
const mockReports = [
  {
    id: 1,
    date: '2025-06-22',
    target: '/api',
    riskScore: 72,
    critical: 3,
    high: 5,
    medium: 8,
    low: 12,
    type: 'Auto',
    project: 'API Gateway',
    compliance: ['SOC2', 'OWASP']
  },
  {
    id: 2,
    date: '2025-06-20',
    target: '/src',
    riskScore: 88,
    critical: 0,
    high: 2,
    medium: 4,
    low: 6,
    type: 'Manual',
    project: 'Frontend',
    compliance: ['GDPR', 'OWASP']
  },
  {
    id: 3,
    date: '2025-06-18',
    target: '/config',
    riskScore: 65,
    critical: 5,
    high: 7,
    medium: 3,
    low: 8,
    type: 'Scheduled',
    project: 'Configuration',
    compliance: ['SOC2']
  },
  {
    id: 4,
    date: '2025-06-15',
    target: '/database',
    riskScore: 45,
    critical: 1,
    high: 3,
    medium: 5,
    low: 15,
    type: 'Manual',
    project: 'Database',
    compliance: ['GDPR', 'SOC2']
  },
  {
    id: 5,
    date: '2025-06-12',
    target: '/auth',
    riskScore: 92,
    critical: 0,
    high: 1,
    medium: 2,
    low: 8,
    type: 'Auto',
    project: 'Authentication',
    compliance: ['OWASP', 'SOC2']
  }
];

const trendData = [
  { date: '2025-06-12', riskScore: 92, vulnerabilities: 11 },
  { date: '2025-06-15', riskScore: 45, vulnerabilities: 24 },
  { date: '2025-06-18', riskScore: 65, vulnerabilities: 23 },
  { date: '2025-06-20', riskScore: 88, vulnerabilities: 12 },
  { date: '2025-06-22', riskScore: 72, vulnerabilities: 28 }
];

export default function ReportsPage() {
  const [filterType, setFilterType] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalReports = mockReports.length;
    const mostRecentDate = mockReports[0]?.date || 'N/A';
    const avgRiskScore = Math.round(mockReports.reduce((sum, report) => sum + report.riskScore, 0) / totalReports);
    const complianceTypes = [...new Set(mockReports.flatMap(report => report.compliance))];
    
    return {
      totalReports,
      mostRecentDate,
      avgRiskScore,
      complianceCoverage: complianceTypes.length
    };
  }, []);

  // Filter and sort reports
  const filteredReports = useMemo(() => {
    let filtered = mockReports;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(report => report.type.toLowerCase() === filterType);
    }

    // Filter by risk level
    if (filterRisk !== 'all') {
      filtered = filtered.filter(report => {
        switch (filterRisk) {
          case 'critical': return report.critical > 0;
          case 'high': return report.high > 0 && report.critical === 0;
          case 'medium': return report.medium > 0 && report.high === 0 && report.critical === 0;
          case 'low': return report.low > 0 && report.medium === 0 && report.high === 0 && report.critical === 0;
          default: return true;
        }
      });
    }

    // Sort reports
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'riskScore':
          aValue = a.riskScore;
          bValue = b.riskScore;
          break;
        case 'critical':
          aValue = a.critical;
          bValue = b.critical;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [filterType, filterRisk, sortBy, sortOrder]);

  const getRiskLevel = (score: number) => {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 50) return 'medium';
    return 'poor';
  };

  const downloadReport = (reportId: number, format: string) => {
    // Mock download functionality
    console.log(`Downloading report ${reportId} as ${format}`);
    // In real implementation, this would trigger actual file download
  };

  if (mockReports.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>📋 Reports & Analysis</h1>
          <p className={styles.subheading}>Access detailed scan reports and export results.</p>
        </div>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📊</div>
          <h3>No reports generated yet</h3>
          <p>Run a scan and generate your first security report.</p>
          <button className={styles.primaryButton}>🧾 Generate New Report</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>📋 Reports & Analysis</h1>
          <p className={styles.subheading}>Access detailed scan reports and export results.</p>
        </div>
        <button className={styles.primaryButton}>🧾 Generate New Report</button>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <div className={`${styles.summaryCard} ${styles.slideIn}`}>
          <div className={styles.cardIcon}>📊</div>
          <div className={styles.cardContent}>
            <h3>{summaryStats.totalReports}</h3>
            <p>Total Reports</p>
          </div>
        </div>
        <div className={`${styles.summaryCard} ${styles.slideIn}`} style={{ animationDelay: '0.1s' }}>
          <div className={styles.cardIcon}>📅</div>
          <div className={styles.cardContent}>
            <h3>{summaryStats.mostRecentDate}</h3>
            <p>Most Recent Report</p>
          </div>
        </div>
        <div className={`${styles.summaryCard} ${styles.slideIn}`} style={{ animationDelay: '0.2s' }}>
          <div className={styles.cardIcon}>⚡</div>
          <div className={styles.cardContent}>
            <h3>{summaryStats.avgRiskScore}%</h3>
            <p>Average Risk Score</p>
          </div>
        </div>
        <div className={`${styles.summaryCard} ${styles.slideIn}`} style={{ animationDelay: '0.3s' }}>
          <div className={styles.cardIcon}>🛡️</div>
          <div className={styles.cardContent}>
            <h3>{summaryStats.complianceCoverage}</h3>
            <p>Compliance Standards</p>
          </div>
        </div>
      </div>

      {/* Trend Visualization */}
      <div className={styles.chartSection}>
        <h2>Risk Score Trends</h2>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--text-secondary)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="riskScore" 
                stroke="var(--primary-color)" 
                fill="var(--primary-color)" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersSection}>
        <div className={styles.filterGroup}>
          <label htmlFor="typeFilter">Filter by Type:</label>
          <select 
            id="typeFilter"
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Types</option>
            <option value="auto">Auto</option>
            <option value="manual">Manual</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="riskFilter">Filter by Risk:</label>
          <select 
            id="riskFilter"
            value={filterRisk} 
            onChange={(e) => setFilterRisk(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="sortBy">Sort by:</label>
          <select 
            id="sortBy"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="date">Date</option>
            <option value="riskScore">Risk Score</option>
            <option value="critical">Critical Issues</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <button 
            className={`${styles.sortButton} ${sortOrder === 'desc' ? styles.active : ''}`}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className={styles.tableSection}>
        <div className={styles.tableContainer}>
          <table className={styles.reportsTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Target</th>
                <th>Project</th>
                <th>Type</th>
                <th>Risk Score</th>
                <th>Critical</th>
                <th>High</th>
                <th>Medium</th>
                <th>Low</th>
                <th>Compliance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className={styles.tableRow}>
                  <td>{report.date}</td>
                  <td>
                    <code className={styles.targetCode}>{report.target}</code>
                  </td>
                  <td>{report.project}</td>
                  <td>
                    <span className={`${styles.typeTag} ${styles[report.type.toLowerCase()]}`}>
                      {report.type}
                    </span>
                  </td>
                  <td>
                    <div className={styles.riskScoreCell}>
                      <span className={`${styles.riskScore} ${styles[getRiskLevel(report.riskScore)]}`}>
                        {report.riskScore}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.severityBadge} ${styles.critical}`}>
                      {report.critical}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.severityBadge} ${styles.high}`}>
                      {report.high}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.severityBadge} ${styles.medium}`}>
                      {report.medium}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.severityBadge} ${styles.low}`}>
                      {report.low}
                    </span>
                  </td>
                  <td>
                    <div className={styles.complianceTags}>
                      {report.compliance.map((standard) => (
                        <span key={standard} className={styles.complianceTag}>
                          {standard}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button 
                        className={styles.actionButton}
                        onClick={() => downloadReport(report.id, 'pdf')}
                        title="Download PDF"
                      >
                        📥
                      </button>
                      <button 
                        className={styles.actionButton}
                        onClick={() => downloadReport(report.id, 'json')}
                        title="Download JSON"
                      >
                        📄
                      </button>
                      <button 
                        className={styles.actionButton}
                        title="View Details"
                      >
                        👁️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}