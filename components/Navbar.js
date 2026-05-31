import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/fixtures', label: 'Fixtures' },
    { href: '/results', label: 'Results' },
    { href: '/squad', label: 'Squad' },
    { href: '/membership', label: 'Join Us' },
  ];

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,22,40,0.97)',
        borderBottom: '1px solid rgba(240,165,0,0.2)',
        backdropFilter: 'blur(10px)',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 42, height: 42,
              background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem',
            }}>🏏</div>
            <div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.3rem',
                letterSpacing: '0.1em',
                color: 'var(--white)',
                lineHeight: 1.1,
              }}>CONCORD WARRIORS</div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '0.7rem',
                color: 'var(--gold)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>Cricket Club</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', gap: '0.25rem' }} className="desktop-nav">
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{
                padding: '0.5rem 1rem',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: '1rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: router.pathname === l.href ? 'var(--gold)' : 'var(--white)',
                borderBottom: router.pathname === l.href ? '2px solid var(--gold)' : '2px solid transparent',
                transition: 'color 0.2s',
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="hamburger"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--white)', fontSize: '1.5rem', padding: '0.5rem',
            }}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div style={{
            background: 'var(--navy-mid)',
            borderTop: '1px solid rgba(240,165,0,0.15)',
            padding: '1rem 0',
          }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                display: 'block',
                padding: '0.75rem 1.5rem',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: '1.1rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: router.pathname === l.href ? 'var(--gold)' : 'var(--white)',
                borderLeft: router.pathname === l.href ? '3px solid var(--gold)' : '3px solid transparent',
              }}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <style jsx global>{`
        .desktop-nav { display: flex; }
        .hamburger { display: none; }
        @media (max-width: 700px) {
          .desktop-nav { display: none; }
          .hamburger { display: block; }
        }
      `}</style>
    </>
  );
}
