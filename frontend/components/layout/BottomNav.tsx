'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import {
  useNotificationStore,
  startNotificationPolling,
  stopNotificationPolling,
} from '@/lib/notifications';
import { useAuthStore } from '@/lib/store';

/* ─── Nav config ─────────────────────────────────────────────── */

type NavItemKind = 'standard' | 'create' | 'profile' | 'chat';

interface NavItemConfig {
  href:       string;
  label:      string;
  kind:       NavItemKind;
  exactMatch?: boolean;
}

const NAV_ITEMS: NavItemConfig[] = [
  { href: '/events',     label: 'Discover', kind: 'standard' },
  { href: '/map',        label: 'Map',      kind: 'standard', exactMatch: true },
  { href: '/events/new', label: '',         kind: 'create' },
  { href: '/chat',       label: 'Chat',     kind: 'chat',    exactMatch: true },
  { href: '/profile',    label: 'Profile',  kind: 'profile', exactMatch: true },
];

/* ─── Icons ──────────────────────────────────────────────────── */

function IconDiscover({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={active ? '0' : '1.8'}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMap({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={active ? '0' : '1.8'}
      />
      <circle
        cx="12" cy="9" r="2.5"
        fill={active ? 'var(--bg-base)' : 'none'}
        stroke={active ? 'none' : 'currentColor'}
        strokeWidth="1.6"
      />
    </svg>
  );
}

function IconCreate() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function IconChat({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={active ? '0' : '1.8'}
        strokeLinejoin="round"
      />
      {!active && (
        <>
          <path d="M8 10h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8 14h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function IconProfile({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12" cy="8" r="4"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={active ? '0' : '1.8'}
      />
      <path
        d="M4 20C4 17 7.58 14 12 14C16.42 14 20 17 20 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ─── Active logic ───────────────────────────────────────────── */

function isRouteActive(itemHref: string, pathname: string, exactMatch = false): boolean {
  if (exactMatch || itemHref === '/events/new') return pathname === itemHref;
  if (pathname === itemHref) return true;
  if (pathname.startsWith(itemHref + '/')) return true;
  return false;
}

/* ─── Component ──────────────────────────────────────────────── */

export default function BottomNav() {
  const pathname     = usePathname();
  const { token }    = useAuthStore();
  const pendingCount = useNotificationStore(s => s.pendingCount);

  useEffect(() => {
    if (!token) return;
    startNotificationPolling();
    return () => stopNotificationPolling();
  }, [token]);

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <div className="bottom-nav-inner">
        {NAV_ITEMS.map((item) => {

          /* ── Create FAB ── */
          if (item.kind === 'create') {
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label="Create event"
                style={{
                  flex: '0 0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 18,
                  background: 'var(--brand-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 20px rgba(124,92,252,0.5), inset 0 1px 0 rgba(255,255,255,0.18)',
                  transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                  <IconCreate />
                </div>
              </Link>
            );
          }

          /* ── Standard items ── */
          const active = isRouteActive(item.href, pathname, item.exactMatch);

          const renderIcon = () => {
            if (item.href === '/events')  return <IconDiscover active={active} />;
            if (item.href === '/map')     return <IconMap active={active} />;
            if (item.kind === 'chat')     return <IconChat active={active} />;
            if (item.kind === 'profile')  return <IconProfile active={active} />;
            return null;
          };

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item${active ? ' active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <div className="nav-item-icon" style={{ position: 'relative' }}>
                {renderIcon()}

                {item.kind === 'profile' && pendingCount > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: -3, right: -4,
                    minWidth: 16, height: 16,
                    background: 'var(--brand-secondary)',
                    borderRadius: 8,
                    border: '2px solid var(--bg-base)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 8, fontWeight: 800,
                    color: '#fff', padding: '0 3px',
                  }}>
                    {pendingCount > 9 ? '9+' : pendingCount}
                  </div>
                )}
              </div>

              {item.label && (
                <span className="nav-item-label">{item.label}</span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
    