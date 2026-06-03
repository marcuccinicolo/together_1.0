'use client';

interface Props {
  iso: string;
}

export function ChatDateSeparator({ iso }: Props) {
  const d = new Date(iso);

  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((today.getTime() - msgDay.getTime()) / 86400000);

  let label: string;
  if (diffDays === 0)      label = 'Today';
  else if (diffDays === 1) label = 'Yesterday';
  else if (diffDays < 7)  label = d.toLocaleDateString('en-US', { weekday: 'long' });
  else                    label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: diffDays > 365 ? 'numeric' : undefined });

  return (
    <div style={{
      display:    'flex',
      alignItems: 'center',
      gap:        10,
      margin:     '16px 0 12px',
    }}>
      <div style={{
        flex:       1,
        height:     1,
        background: 'var(--border-subtle)',
        opacity:    0.6,
      }} />
      <span style={{
        fontSize:      11,
        fontWeight:    700,
        color:         'var(--text-muted)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        padding:       '4px 12px',
        borderRadius:  999,
        background:    'var(--bg-elevated)',
        border:        '1px solid var(--border-subtle)',
        whiteSpace:    'nowrap',
        flexShrink:    0,
      }}>
        {label}
      </span>
      <div style={{
        flex:       1,
        height:     1,
        background: 'var(--border-subtle)',
        opacity:    0.6,
      }} />
    </div>
  );
}
