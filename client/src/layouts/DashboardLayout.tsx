// Placeholder: DashboardLayout will be implemented in feat/04-auth-frontend
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
