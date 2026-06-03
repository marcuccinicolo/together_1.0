'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  /** Large title displayed prominently */
  title: string;
  /** Small uppercase label above the title */
  label?: string;
  /** Element rendered on the right side (icon button, badge, etc.) */
  action?: ReactNode;
  /** Href for a back arrow rendered on the left */
  backHref?: string;
  /** aria-label for the back button */
  backLabel?: string;
  /** Whether the header should be sticky inside .scroll-area */
  sticky?: boolean;
  /** Show a subtle gradient separator below the header */
  border?: boolean;
  /** Extra bottom padding when you need more breathing room */
  paddingBottom?: number;
}

export function PageHeader({
  title,
  label,
  action,
  backHref,
  backLabel = 'Back',
  sticky = true,
  border = true,
  paddingBottom = 14,
}: Props) {
  return (
    <header
      className={sticky ? 'page-header' : undefined}
      style={
        !sticky
          ? { padding: `20px 20px ${paddingBottom}px` }
          : { paddingBottom }
      }
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        {/* Back button */}
        {backHref && (
          <Link
            href={backHref}
            aria-label={backLabel}
            style={{
              width: 38,
              height: 38,
              borderRadius: 13,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'var(--text-primary)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5M12 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        )}

        {/* Title block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {label && (
            <p className="page-header-label">{label}</p>
          )}
          <h1 className="page-header-title"
            style={backHref ? { fontSize: 22, letterSpacing: '-0.03em' } : undefined}
          >
            {title}
          </h1>
        </div>

        {/* Right action */}
        {action && (
          <div style={{ flexShrink: 0 }}>
            {action}
          </div>
        )}
      </div>

      {border && (
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--border-subtle), transparent)',
          marginTop: 14,
        }} />
      )}
    </header>
  );
}
