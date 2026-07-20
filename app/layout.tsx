import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Operational Governance Center',
  description: 'Dashboards operacionais Medcof',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
