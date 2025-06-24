'use client';

import { useState, useEffect } from 'react';
import { Shield, Zap, Eye, FileCheck, Brain, Building, Users, CheckCircle } from 'lucide-react';
import styles from '../styles/Home.module.scss';

import { useRouter } from 'next/navigation';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'warning' | 'success';
  delay: number;
}


const terminalLines: TerminalLine[] = [
  { text: '$ zecure scan --target ./src', type: 'command', delay: 0 },
  { text: 'Scanning codebase for vulnerabilities...', type: 'output', delay: 1200 },
  { text: 'SQL Injection risk detected in user-input.js:42', type: 'warning', delay: 2500 },
  { text: 'XSS vulnerability found in render.tsx:18', type: 'warning', delay: 3800 },
  { text: 'Generated security patches', type: 'success', delay: 5000 },
];

const features = [
  {
    title: 'AI Code Analysis',
    description: 'Intelligent vulnerability detection and automated security recommendations powered by advanced machine learning.',
    icon: Zap
  },
  {
    title: 'Real-time Monitoring',
    description: 'Continuous threat detection across your entire infrastructure with instant alerts and responses.',
    icon: Eye
  },
  {
    title: 'Compliance Mapping',
    description: 'Automated reporting for SOC2, GDPR, HIPAA, and other frameworks with complete audit trails.',
    icon: FileCheck
  },
  {
    title: 'Security Copilot',
    description: 'Interactive AI assistant for security queries, automation, and expert guidance at your fingertips.',
    icon: Brain
  }
];

const trustPoints = [
  {
    title: 'Built for Security Teams',
    description: 'Designed specifically for security professionals and enterprise workflows with modern threat detection capabilities.',
    icon: Shield
  },
  {
    title: 'AI-Driven Insights',
    description: 'Every recommendation includes clear explanations and actionable security guidance backed by machine learning.',
    icon: Brain
  },
  {
    title: 'Modern Architecture',
    description: 'Cloud-native design built for scale, performance, and reliability with enterprise-grade security.',
    icon: Building
  },
  {
    title: 'Proven Results',
    description: 'Trusted by early adopters and security researchers to proactively reduce risk and boost compliance.',
    icon: CheckCircle
  }
];

export default function HomePage() {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const router = useRouter();

  const handleScheduleDemo = () => setShowDemoModal(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentLine < terminalLines.length) {
        setDisplayedLines(prev => [...prev, terminalLines[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }
    }, terminalLines[currentLine]?.delay || 0);

    return () => clearTimeout(timer);
  }, [currentLine]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className={styles.page}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <div className={styles.logo}>
              <img src="/zecure.png" alt="Zecure Logo" className={styles.logoImage} />
              Zecure
            </div>
            <div className={styles.navLinks}>
              <a href="#features" className={styles.navLink}>Features</a>
              <a href="#security" className={styles.navLink}>Security</a>
              <a href="#contact" className={styles.navLink}>Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroLeft}>
              <div className={styles.heroTag}>
                <span>Enterprise Security</span>
              </div>
              <h1>
                <span className={styles.logoGradient}>Zecure</span>: AI Security Copilot
              </h1>
              <p>
                Intelligent security analysis for modern applications.
                Automated vulnerability detection, compliance reporting,
                and AI-powered security insights that scale with your business.
              </p>
              <div className={styles.heroActions}>
                <button
                  className={styles.ctaButton}
                  onClick={() => router.push('/dashboard')}
                >
                  Enter Zecure
                </button>
                <button className={styles.secondaryButton} onClick={handleScheduleDemo}>
                  Schedule Demo
                </button>
              </div>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>10,000+</span>
                  <span className={styles.statLabel}>Vulnerabilities Detected</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>99.9%</span>
                  <span className={styles.statLabel}>Uptime Guaranteed</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>500+</span>
                  <span className={styles.statLabel}>Enterprise Clients</span>
                </div>
              </div>
            </div>

            <div className={styles.heroRight}>
              <div className={styles.terminal}>
                <div className={styles.terminalHeader}>
                  <div className={styles.terminalControls}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className={styles.terminalTitle}>zecure-cli</span>
                </div>
                <div className={styles.terminalBody}>
                  {displayedLines.map((line, index) => (
                    <div
                      key={index}
                      className={`${styles.terminalLine} ${styles[line.type]}`}
                    >
                      {line.text}
                    </div>
                  ))}
                  <div className={styles.cursor}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showDemoModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalLogo}>Zecure<sup>®</sup></div>
            <h2>Let’s Plan Your Guided Tour</h2>
            <p>We’re excited to show you how Zecure can proactively protect your systems. In this 1:1 session, we’ll walk you through features tailored to your workflows.</p>
            <p>Reach out at <strong>samarthpatil@zecure.ai</strong> or just reply to your onboarding email—we'll handle the rest.</p>
            <button onClick={() => setShowDemoModal(false)} className={styles.secondaryButton}>
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Comprehensive Security Solutions</h2>
            <p>Everything you need to protect your applications and infrastructure</p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <IconComponent size={32} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="security" className={styles.trust}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Why Leading Companies Choose <span className={styles.logoGradient}>Zecure</span></h2>
            <p>Built by security experts, trusted by industry leaders</p>
          </div>
          <div className={styles.trustGrid}>
            {trustPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <div key={index} className={styles.trustCard}>
                  <div className={styles.trustIcon}>
                    <IconComponent size={40} />
                  </div>
                  <div className={styles.trustContent}>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Secure Your Applications?</h2>
            <p>Join thousands of developers and security teams using Zecure to protect their code.</p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className={styles.ctaForm}>
                <input
                  type="email"
                  placeholder="Enter your work email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.emailInput}
                  required
                />
                <button type="submit" className={styles.submitButton}>
                  Get Started Free
                </button>
              </form>
            ) : (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <p>Thank you! We'll be in touch within 24 hours.</p>
              </div>
            )}

            <div className={styles.ctaNote}>
              <p>No credit card required • 14-day free trial • Enterprise support available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerLeft}>
              <span className={styles.logo}>Zecure</span>
              <span className={styles.copyright}>© 2025 Kiyaan Technologies. All rights reserved.</span>
              <span>Developed by <strong>Samarth prashant Patil</strong></span>
            </div>
            <div className={styles.footerRight}>
              <a href="#" className={styles.footerLink}>Privacy Policy</a>
              <a href="#" className={styles.footerLink}>Terms of Service</a>
              <a href="#" className={styles.footerLink}>Security</a>
              <a href="#" className={styles.footerLink}>Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}