// app/dashboard/layout.tsx
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import '@/styles/globals.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboardLayout">
      <Sidebar />
      <div className="dashboardMain">
        <Navbar />
        <div className="dashboardContent">{children}</div>
      </div>
    </div>
  );
}