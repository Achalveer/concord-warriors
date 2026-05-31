import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
          height: '68px',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Image src="/logo.svg" alt="Concord Warriors" width={50} height={50} />
            <div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '1.25rem',
                letterSpacing: '0.1em',
                color: 'var(--white)',
                lineHeight: 1.1,
              }}>CONCORD WARRIORS</div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '0.65rem',
                color: 'var(--gold)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}>Cricket Club</div>
            </div>
          </Link>

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

          <button onClick={() => setOpen(!open)} className="hamburger" style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--white)', fontSize: '1.5rem', padding: '0.5rem',
          }}>
            {open ? '✕' : '☰'}
          </button>
        </div>

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
