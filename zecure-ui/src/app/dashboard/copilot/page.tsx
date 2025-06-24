'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, RotateCcw, Trash2, Paperclip, Bot, Zap } from 'lucide-react';
import styles from '@/styles/Copilot.module.scss';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ZecureCopilot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
    setMessages([
      {
        id: '1',
        type: 'ai',
        content: '👋 Hello! I\'m your Zecure Copilot. I can help you with security operations, vulnerability analysis, firewall configurations, and more. What would you like to explore today?',
        timestamp: new Date()
      }
    ]);
  }, []);

  const suggestedPrompts = [
    "What were the top vulnerabilities in my last scan?",
    "Generate firewall rules for a Next.js API",
    "Explain this CSP header",
    "Create OWASP Top 10 checklist",
    "Generate secure Docker configuration",
    "Analyze this security log",
    "Best practices for API authentication",
    "Create incident response playbook"
  ];

  const recentIntents = [
    "Vulnerability Assessment",
    "Security Headers",
    "Firewall Configuration",
    "Penetration Testing"
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (prompt: string): string => {
    const responses = {
      'vulnerabilities': `🔍 **Vulnerability Analysis**

Based on your recent scans, here are the top vulnerabilities:

\`\`\`
1. SQL Injection (Critical) - /api/users
2. XSS Vulnerability (High) - Contact form
3. Insecure Direct Object Reference (Medium) - User profiles
4. Missing Security Headers (Low) - All endpoints
\`\`\`

**Recommended Actions:**
• Implement parameterized queries
• Add input validation and sanitization
• Configure proper access controls
• Deploy security headers`,

      'firewall': `🛡️ **Firewall Rules for Next.js API**

\`\`\`bash
# Allow HTTP/HTTPS traffic
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Allow Next.js development (port 3000)
iptables -A INPUT -p tcp --dport 3000 -s 127.0.0.1 -j ACCEPT

# Block common attack vectors
iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --set
iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --update --seconds 60 --hitcount 4 -j DROP
\`\`\``,

      'csp': `🔒 **Content Security Policy Headers**

\`\`\`http
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.example.com;
  font-src 'self' https://fonts.gstatic.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
\`\`\`

This CSP prevents XSS attacks by restricting resource loading sources.`
    };

    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('vulnerabilit') || lowerPrompt.includes('scan')) {
      return responses.vulnerabilities;
    } else if (lowerPrompt.includes('firewall') || lowerPrompt.includes('rule')) {
      return responses.firewall;
    } else if (lowerPrompt.includes('csp') || lowerPrompt.includes('header')) {
      return responses.csp;
    }

    return `✅ I understand you're asking about: "${prompt}"

I can help you with various security operations including:
• Vulnerability assessments and remediation
• Security configuration and hardening  
• Incident response and forensics
• Compliance and risk management
• Secure coding practices

Could you provide more specific details about what you'd like to accomplish?`;
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now().toString(),
      type: 'ai',
      content: '👋 Chat cleared! I\'m ready to help with your security operations. What would you like to explore?',
      timestamp: new Date()
    }]);
  };

  const retryLastMessage = () => {
    if (messages.length > 1) {
      const lastUserMessage = [...messages].reverse().find(m => m.type === 'user');
      if (lastUserMessage) {
        setInputValue(lastUserMessage.content);
        textareaRef.current?.focus();
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <Bot className={styles.logo} />
          <h1 className={styles.title}>Copilot</h1>
        </div>
        <div className={styles.status}>
          <div className={`${styles.statusIndicator} ${isConnected ? styles.online : styles.offline}`}>
            <Zap size={16} />
          </div>
          <span className={styles.statusText}>
            {isConnected ? '🟢 Connected to AI Engine' : '🔴 Disconnected'}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Sidebar: Suggested Prompts */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>💡 Try asking...</h3>
            <div className={styles.promptList}>
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className={styles.promptButton}
                  onClick={() => handlePromptClick(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle}>🕒 Recent Intents</h3>
            <div className={styles.recentList}>
              {recentIntents.map((intent, index) => (
                <div key={index} className={styles.recentItem}>
                  {intent}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Chat Interface */}
        <main className={styles.chatContainer}>
          <div className={styles.chatMessages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${message.type === 'user' ? styles.userMessage : styles.aiMessage}`}
              >
                <div className={styles.messageContent}>
                  {message.content.split('\n').map((line, i) => {
                    if (line.startsWith('```')) {
                      const isClosing = line === '```';
                      return isClosing ? null : <div key={i} className={styles.codeBlock}>{line.replace('```', '')}</div>;
                    }
                    if (line.includes('```')) {
                      const parts = line.split('```');
                      return (
                        <div key={i}>
                          {parts[0]}
                          {parts[1] && <code className={styles.inlineCode}>{parts[1]}</code>}
                          {parts[2]}
                        </div>
                      );
                    }
                    return <div key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />;
                  })}
                </div>
                <div className={styles.messageTime}>
                  {isClient ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Section */}
          <div className={styles.inputSection}>
            <div className={styles.inputContainer}>
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Copilot anything about security operations..."
                className={styles.chatInput}
                rows={3}
              />
              <div className={styles.actionButtons}>
                <button
                  className={styles.actionButton}
                  onClick={() => {}}
                  title="Upload file"
                >
                  <Paperclip size={18} />
                </button>
                <button
                  className={styles.actionButton}
                  onClick={retryLastMessage}
                  title="Retry last message"
                >
                  <RotateCcw size={18} />
                </button>
                <button
                  className={styles.actionButton}
                  onClick={clearChat}
                  title="Clear chat"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  className={`${styles.actionButton} ${styles.sendButton}`}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  title="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ZecureCopilot;