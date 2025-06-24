'use client'

import React, { useState } from 'react'
import styles from '@/styles/Settings.module.scss';
import { FiSettings } from 'react-icons/fi';

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Viewer' | 'Editor'
  status: 'Active' | 'Inactive'
  avatar?: string
}

interface Organization {
  name: string
  industry: string
  memberLimit: number
  domainRestrictions: string[]
  licensePlan: string
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [scanDepth, setScanDepth] = useState<'light' | 'deep'>('light')
  const [autoScanFreq, setAutoScanFreq] = useState<'manual' | 'daily' | 'weekly'>('manual')
  const [notifications, setNotifications] = useState({
    email: true,
    criticalFindings: true,
    patchSuggestions: true,
    scanSuccess: false,
    criticalThreat: true,
    vulnerabilityWarning: true
  })

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Samarth',
      email: 'samarth@Zecure',
      role: 'Admin',
      status: 'Active',
      avatar: 'JD'
    },
    {
      id: '2',
      name: 'Soham',
      email: 'soham@kiyaan',
      role: 'Editor',
      status: 'Active',
      avatar: 'SW'
    },
  ])

  const [organization] = useState<Organization>({
    name: 'Kiyaan Innovations ',
    industry: 'Technology',
    memberLimit: 50,
    domainRestrictions: ['@company.com', '@acme.org'],
    licensePlan: 'Enterprise'
  })

  const [integrations] = useState({
    github: { connected: true, repos: 12 },
    gitlab: { connected: false, repos: 0 },
    slack: { connected: true, webhook: 'https://hooks.slack.com/...' },
    teams: { connected: false, webhook: '' }
  })

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: '👤' },
    { id: 'organization', label: 'Organization', icon: '🏢' },
    { id: 'team', label: 'Team Members', icon: '👥' },
    { id: 'scan', label: 'Scan Preferences', icon: '🔍' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'danger', label: 'Danger Zone', icon: '⚠️' }
  ]

  const renderProfileSettings = () => (
    <div className={styles.section}>
      <h3>Profile Settings</h3>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          <span>JD</span>
        </div>
        <div className={styles.profileInfo}>
          <input type="text" defaultValue="Samarth Patil" className={styles.input} />
          <input type="email" defaultValue="samarth.patil@zecure.ai" className={styles.input} readOnly />
          <span className={styles.role}>Admin</span>
        </div>
      </div>


      <div className={styles.formGroup}>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={twoFactorEnabled}
            onChange={(e) => setTwoFactorEnabled(e.target.checked)}
          />
          <span>Enable Two-Factor Authentication</span>
        </label>
      </div>

      <button className={styles.primaryBtn}>Change Password</button>
    </div>
  )

  const renderOrganizationSettings = () => (
    <div className={styles.section}>
      <h3>Organization Settings</h3>
      <div className={styles.formGroup}>
        <label>Organization Name</label>
        <input type="text" defaultValue={organization.name} className={styles.input} />
      </div>

      <div className={styles.formGroup}>
        <label>Industry</label>
        <select className={styles.select} defaultValue={organization.industry}>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* <div className={styles.formGroup}>
        <label>Member Limit</label>
        <input type="number" defaultValue={organization.memberLimit} className={styles.input} />
      </div> */}

      <div className={styles.formGroup}>
        <label>Domain Restrictions</label>
        <div className={styles.domainList}>
          {organization.domainRestrictions.map((domain, index) => (
            <span key={index} className={styles.domainTag}>
              {domain}
              <button className={styles.removeTag}>×</button>
            </span>
          ))}
        </div>
        <input type="text" placeholder="Add domain restriction" className={styles.input} />
      </div>

      <div className={styles.planInfo}>
        <h4>Current Plan: {organization.licensePlan}</h4>
        <button className={styles.secondaryBtn}>Upgrade Plan</button>
      </div>
    </div>
  )

  const renderTeamMembers = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3>Team Members</h3>
        <button className={styles.primaryBtn}>+ Invite Member</button>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>Name</span>
          <span>Role</span>
          <span>Email</span>
          <span>Status</span>
          <span>Action</span>
        </div>
        {teamMembers.map((member) => (
          <div key={member.id} className={styles.tableRow}>
            <div className={styles.memberInfo}>
              <div className={styles.memberAvatar}>{member.avatar}</div>
              <span>{member.name}</span>
            </div>
            <span className={`${styles.role} ${styles[member.role.toLowerCase()]}`}>
              {member.role}
            </span>
            <span>{member.email}</span>
            <span className={`${styles.status} ${styles[member.status.toLowerCase()]}`}>
              {member.status}
            </span>
            <div className={styles.actions}>
              <button className={styles.actionBtn}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderScanPreferences = () => (
    <div className={styles.section}>
      <h3>Scan Preferences</h3>

      <div className={styles.formGroup}>
        <label>Default Scan Depth</label>
        <div className={styles.toggleGroup}>
          <button
            className={`${styles.toggleBtn} ${scanDepth === 'light' ? styles.active : ''}`}
            onClick={() => setScanDepth('light')}
          >
            Light Scan
          </button>
          <button
            className={`${styles.toggleBtn} ${scanDepth === 'deep' ? styles.active : ''}`}
            onClick={() => setScanDepth('deep')}
          >
            Deep Scan
          </button>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Auto-scan Frequency</label>
        <select
          className={styles.select}
          value={autoScanFreq}
          onChange={(e) => setAutoScanFreq(e.target.value as typeof autoScanFreq)}
        >
          <option value="manual">Manual</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={notifications.criticalFindings}
            onChange={(e) => setNotifications({ ...notifications, criticalFindings: e.target.checked })}
          />
          <span>Notify on critical findings</span>
        </label>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={notifications.patchSuggestions}
            onChange={(e) => setNotifications({ ...notifications, patchSuggestions: e.target.checked })}
          />
          <span>Enable patch suggestions</span>
        </label>
      </div>
    </div>
  )

  const renderIntegrations = () => (
    <div className={styles.section}>
      <h3>Integrations</h3>

      <div className={styles.integrationGrid}>
        <div className={styles.integrationCard}>
          <div className={styles.integrationHeader}>
            <span className={styles.integrationIcon}>🐙</span>
            <div>
              <h4>GitHub</h4>
              <p>Connect your repositories</p>
            </div>
          </div>
          {integrations.github.connected ? (
            <div className={styles.connected}>
              <span className={styles.connectedBadge}>✅ Connected</span>
              <p>{integrations.github.repos} repositories</p>
              <button className={styles.secondaryBtn}>Manage</button>
            </div>
          ) : (
            <button className={styles.primaryBtn}>Connect</button>
          )}
        </div>

        <div className={styles.integrationCard}>
          <div className={styles.integrationHeader}>
            <span className={styles.integrationIcon}>🦊</span>
            <div>
              <h4>GitLab</h4>
              <p>Connect your projects</p>
            </div>
          </div>
          <button className={styles.primaryBtn}>Connect</button>
        </div>

        <div className={styles.integrationCard}>
          <div className={styles.integrationHeader}>
            <span className={styles.integrationIcon}>💬</span>
            <div>
              <h4>Slack</h4>
              <p>Get notifications in Slack</p>
            </div>
          </div>
          {integrations.slack.connected ? (
            <div className={styles.connected}>
              <span className={styles.connectedBadge}>✅ Connected</span>
              <button className={styles.secondaryBtn}>Configure</button>
            </div>
          ) : (
            <button className={styles.primaryBtn}>Connect</button>
          )}
        </div>

        <div className={styles.integrationCard}>
          <div className={styles.integrationHeader}>
            <span className={styles.integrationIcon}>💼</span>
            <div>
              <h4>Microsoft Teams</h4>
              <p>Teams notifications</p>
            </div>
          </div>
          <button className={styles.primaryBtn}>Connect</button>
        </div>
      </div>
      {/* 
      <div className={styles.webhookSection}>
        <h4>Webhook Configuration</h4>
        <div className={styles.formGroup}>
          <label>Webhook Endpoint</label>
          <input 
            type="url" 
            placeholder="https://your-endpoint.com/webhook" 
            className={styles.input} 
          />
        </div>
        <button className={styles.secondaryBtn}>Test Webhook</button>
      </div> */}
    </div>
  )

  const renderNotifications = () => (
    <div className={styles.section}>
      <h3>Notifications</h3>

      <div className={styles.formGroup}>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={notifications.email}
            onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
          />
          <span>Email notifications</span>
        </label>
      </div>

      <h4>Slack Alerts</h4>
      <div className={styles.notificationGroup}>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={notifications.scanSuccess}
            onChange={(e) => setNotifications({ ...notifications, scanSuccess: e.target.checked })}
          />
          <span>🟢 Scan Success</span>
        </label>

        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={notifications.criticalThreat}
            onChange={(e) => setNotifications({ ...notifications, criticalThreat: e.target.checked })}
          />
          <span>🔴 Critical Threat</span>
        </label>

        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={notifications.vulnerabilityWarning}
            onChange={(e) => setNotifications({ ...notifications, vulnerabilityWarning: e.target.checked })}
          />
          <span>🟠 Vulnerability Warning</span>
        </label>
      </div>

      <div className={styles.formGroup}>
        <label>Preferred Language</label>
        <select className={styles.select} defaultValue="en">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Timezone</label>
        <select className={styles.select} defaultValue="UTC">
          <option value="UTC">UTC</option>
          <option value="America/New_York">Eastern Time</option>
          <option value="America/Los_Angeles">Pacific Time</option>
          <option value="Europe/London">London</option>
          <option value="Asia/Tokyo">Tokyo</option>
        </select>
      </div>
    </div>
  )

  const renderDangerZone = () => (
    <div className={styles.section}>
      <h3 className={styles.dangerTitle}>⚠️ Danger Zone</h3>
      <p className={styles.dangerWarning}>
        These actions are irreversible. Please proceed with caution.
      </p>

      <div className={styles.dangerActions}>
        <div className={styles.dangerAction}>
          <div>
            <h4>Reset All Scan Data</h4>
            <p>Remove all scan history and results</p>
          </div>
          <button className={styles.dangerBtn}>🔓 Reset Data</button>
        </div>

        <div className={styles.dangerAction}>
          <div>
            <h4>Revoke All API Tokens</h4>
            <p>Invalidate all existing API tokens</p>
          </div>
          <button className={styles.dangerBtn}>🚫 Revoke Tokens</button>
        </div>

        <div className={styles.dangerAction}>
          <div>
            <h4>Delete Organization</h4>
            <p>Permanently delete this organization and all data</p>
          </div>
          <button className={styles.dangerBtn}>❌ Delete Organization</button>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileSettings()
      case 'organization': return renderOrganizationSettings()
      case 'team': return renderTeamMembers()
      case 'scan': return renderScanPreferences()
      case 'integrations': return renderIntegrations()
      case 'notifications': return renderNotifications()
      case 'danger': return renderDangerZone()
      default: return renderProfileSettings()
    }
  }

  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        {/* <h1> Settings</h1> */}
        <h1>
          <FiSettings size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Settings
        </h1>
        <p>Manage your workspace, preferences, and security configurations.</p>
      </div>

      <div className={styles.container}>
        <nav className={styles.sidebar}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </nav>

        <main className={styles.content}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  )
}

export default SettingsPage