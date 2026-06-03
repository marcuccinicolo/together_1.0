'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, hydrateAuth } from '@/lib/store';
import BottomNav from './BottomNav';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    hydrateAuth();
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && !token) {
      router.replace('/auth/login');
    }
  }, [ready, token, router]);

  if (!ready) {
    return (
      <div id="app-root">
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 14,
        }}>
          <div style={{
            width: 36,
            height: 36,
            border: '3px solid rgba(255,255,255,0.08)',
            borderTopColor: 'var(--brand-primary)',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }} />
          <span style={{
            fontSize: 12,
            color: 'var(--text-muted)',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            Loading
          </span>
        </div>
      </div>
    );
  }

  if (!token) return null;

  return (
    <ErrorBoundary>
      {/*
        #app-root is defined in globals.css as:
          display: flex; flex-direction: column; height: 100dvh;
        
        Structure:
          ┌─────────────────────────┐
          │   status-bar-space      │ ← env(safe-area-inset-top)
          ├─────────────────────────┤
          │                         │
          │   scroll-area (flex:1)  │ ← only element that scrolls
          │                         │
          ├─────────────────────────┤
          │   BottomNav             │ ← static, never position:fixed
          │   + safe-area-bottom    │
          └─────────────────────────┘
      */}
      <div id="app-root">
        {/* Notch / Dynamic Island spacer */}
        <div className="status-bar-space" aria-hidden="true" />

        {/* Scrollable content area */}
        <main className="scroll-area">
          {children}
        </main>

        {/* Bottom navigation — static flex child, not fixed */}
        <BottomNav />
      </div>
    </ErrorBoundary>
  );
}
