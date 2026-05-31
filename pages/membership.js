import Head from 'next/head';

export default function Membership() {
  return (
    <>
      <Head>
        <title>Join Us — Concord Warriors Cricket Club</title>
      </Head>

      <div style={{ padding: '4rem 0' }}>
        <div className="container">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(240,165,0,0.1)',
              border: '1px solid rgba(240,165,0,0.25)',
              borderRadius: '20px',
              padding: '0.35rem 1rem',
              marginBottom: '1.5rem',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              Now Recruiting
            </div>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              lineHeight: 1,
              letterSpacing: '0.03em',
              marginBottom: '1rem',
            }}>
              Join the <span style={{ color: 'var(--gold)' }}>Warriors!</span>
            </h1>
            <p style={{
              color: 'var(--grey)',
              fontSize: '1.1rem',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}>
              Be part of a competitive, inclusive cricket community. Whether you're a core player
              or looking to stay involved flexibly — we have a spot for you.
            </p>
          </div>

          {/* Membership Tiers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '5rem',
          }}>
            {/* Full Membership */}
            <div style={{
              background: 'linear-gradient(160deg, var(--navy-light) 0%, var(--navy-mid) 100%)',
              border: '2px solid var(--gold)',
              borderRadius: '12px',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                background: 'var(--gold)',
                color: 'var(--navy)',
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '0.85rem',
                letterSpacing: '0.1em',
                padding: '0.3rem 1rem',
                borderBottomLeftRadius: '8px',
              }}>MOST POPULAR</div>

              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '2rem',
                color: 'var(--gold)',
                letterSpacing: '0.06em',
                marginBottom: '0.5rem',
              }}>Full Membership</h2>
              <p style={{ color: 'var(--grey)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                The primary path to our core team for tournaments. For dedicated, competitive players.
              </p>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '0.8rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--grey)',
                    marginBottom: '0.5rem',
                  }}>CCC5 Enrolled Members</div>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '3rem',
                    color: 'var(--white)',
                    lineHeight: 1,
                  }}>
                    $99<span style={{ fontSize: '1.2rem', color: 'var(--grey)' }}>/year</span>
                  </div>
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '0.8rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--grey)',
                    marginBottom: '0.5rem',
                  }}>Others</div>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '3rem',
                    color: 'var(--white)',
                    lineHeight: 1,
                  }}>
                    $149<span style={{ fontSize: '1.2rem', color: 'var(--grey)' }}>/year</span>
                  </div>
                </div>
              </div>

              {[
                'Core team player for all tournaments',
                'Guaranteed match slots',
                '3+ tournaments per year',
                'Post-match social events',
                'Club jersey & gear access',
              ].map(f => (
                <div key={f} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{ color: 'var(--gold)', fontSize: '1rem', marginTop: '2px' }}>✓</span>
                  <span style={{ color: 'var(--white)', fontSize: '0.95rem' }}>{f}</span>
                </div>
              ))}

              <a
                href="https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ width: '100%', textAlign: 'center', marginTop: '2rem', display: 'block' }}
              >
                Sign Up — Full Member
              </a>
            </div>

            {/* Flex Membership */}
            <div style={{
              background: 'var(--navy-mid)',
              border: '1px solid rgba(240,165,0,0.2)',
              borderRadius: '12px',
              padding: '2.5rem',
            }}>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '2rem',
                color: 'var(--white)',
                letterSpacing: '0.06em',
                marginBottom: '0.5rem',
              }}>Flex Membership</h2>
              <p style={{ color: 'var(--grey)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                A flexible way to stay involved with lower commitment. Join as needed to fill core teams.
              </p>

              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--grey)',
                  marginBottom: '0.5rem',
                }}>Annual</div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '3rem',
                  color: 'var(--white)',
                  lineHeight: 1,
                }}>
                  $49<span style={{ fontSize: '1.2rem', color: 'var(--grey)' }}>/year</span>
                </div>
              </div>

              {[
                'Play as needed to fill teams',
                'No regular commitment required',
                'Be part of the community',
                'Social events access',
                'Upgrade to Full any time',
              ].map(f => (
                <div key={f} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  marginBottom: '0.75rem',
                }}>
                  <span style={{ color: 'var(--gold)', fontSize: '1rem', marginTop: '2px' }}>✓</span>
                  <span style={{ color: 'var(--white)', fontSize: '0.95rem' }}>{f}</span>
                </div>
              ))}

              <a
                href="https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964"
                target="_blank" rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ width: '100%', textAlign: 'center', marginTop: '2rem', display: 'block' }}
              >
                Sign Up — Flex Member
              </a>
            </div>
          </div>

          {/* What You Get */}
          <div style={{ marginBottom: '5rem' }}>
            <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>What You Get</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
            }}>
              {[
                { icon: '🏆', title: 'Tourney Action', desc: 'At least 3 major tournaments per year with competitive cricket.' },
                { icon: '☕', title: 'Refreshments & Events', desc: 'At least 2 major post-match social gatherings per year.' },
                { icon: '🤝', title: 'Equal Opportunity', desc: '15-member teams with defined batting and bowling roles.' },
                { icon: '🌍', title: 'Inclusive Culture', desc: 'We value skills at every level — all backgrounds welcome.' },
              ].map(f => (
                <div key={f.title} className="card">
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                  <h3 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.3rem',
                    color: 'var(--gold)',
                    marginBottom: '0.5rem',
                  }}>{f.title}</h3>
                  <p style={{ color: 'var(--grey)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CricClubs signup CTA */}
          <div style={{
            background: 'var(--navy-mid)',
            border: '1px solid rgba(240,165,0,0.2)',
            borderRadius: '12px',
            padding: '3rem',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '2.5rem',
              marginBottom: '1rem',
            }}>Ready to Play?</h2>
            <p style={{ color: 'var(--grey)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              Registration is handled through our CricClubs league page.
              Click below to complete your sign-up.
            </p>
            <a
              href="https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
            >
              Register on CricClubs
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
