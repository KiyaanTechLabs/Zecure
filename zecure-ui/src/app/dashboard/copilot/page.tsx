'use client';
import styles from '@/styles/Copilot.module.scss';

export default function CopilotPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🔐 Zecure Copilot</h1>
      <p className={styles.subheading}>
        Ask anything about your code or infra security. Your AI copilot will help.
      </p>
      <div className={styles.chatBox}>
        <input type="text" placeholder="Ask your copilot..." />
        <button>Send</button>
      </div>
    </div>
  );
}