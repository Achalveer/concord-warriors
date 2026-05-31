import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--navy-mid)',
      borderTop: '1px solid rgba(240,165,0,0.15)',
      padding: '3rem 0 2rem',
      marginTop: '5rem',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          <div>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.4rem',
              color: 'var(--gold)',
              marginBottom: '0.5rem',
              letterSpacing: '0.08em',
            }}>CONCORD WARRIORS</div>
            <p style={{ color: 'var(--grey)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Cricket Club — passionate about the game, united as a team.
            </p>
          </div>
          <div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '0.75rem',
            }}>Quick Links</div>
            {[
              { href: '/fixtures', label: 'Fixtures' },
              { href: '/results', label: 'Results' },
              { href: '/squad', label: 'Squad' },
              { href: '/membership', label: 'Join Us' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{
                display: 'block',
                color: 'var(--grey)',
                fontSize: '0.9rem',
                marginBottom: '0.4rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--grey)'}
              >{l.label}</Link>
            ))}
          </div>
          <div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '0.75rem',
            }}>Membership</div>
            <p style={{ color: 'var(--grey)', fontSize: '0.9rem' }}>Full Member: $99–$149/yr</p>
            <p style={{ color: 'var(--grey)', fontSize: '0.9rem' }}>Flex Member: $49/yr</p>
            <Link href="/membership" style={{
              display: 'inline-block',
              marginTop: '1rem',
              padding: '0.5rem 1.25rem',
              background: 'var(--gold)',
              color: 'var(--navy)',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1rem',
              letterSpacing: '0.08em',
              borderRadius: '4px',
            }}>Sign Up Now</Link>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          <p style={{ color: 'var(--grey)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Concord Warriors Cricket Club
          </p>
          <a
            href="https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--grey)', fontSize: '0.8rem' }}
          >
            Powered by CricClubs
          </a>
        </div>
      </div>
    </footer>
  );
}
