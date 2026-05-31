import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  const [fixtures, setFixtures] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/cricclubs?type=fixtures&league=current').then(r => r.json()),
      // Show SKY League as most recent results on homepage
      fetch('/api/cricclubs?type=results&league=sky').then(r => r.json()),
    ]).then(([f, r]) => {
      setFixtures((f.data || []).slice(0, 3));
      setResults((r.data || []).slice(0, 3));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>Concord Warriors Cricket Club</title>
        <meta name="description" content="Concord Warriors Cricket Club — Join the Warriors! Tournaments, fixtures, results and squad." />
      </Head>

      {/* HERO */}
      <section style={{
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: `
          radial-gradient(ellipse at 70% 50%, rgba(240,165,0,0.08) 0%, transparent 60%),
          linear-gradient(180deg, var(--navy) 0%, var(--navy-mid) 100%)
        `,
      }}>
        {/* Decorative cricket seam lines */}
        <div style={{
          position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)',
          width: '500px', height: '500px', borderRadius: '50%',
          border: '2px solid rgba(240,165,0,0.06)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)',
          width: '380px', height: '380px', borderRadius: '50%',
          border: '1px solid rgba(240,165,0,0.04)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div style={{ maxWidth: '680px' }}>
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
              🏏 Now Recruiting — Join for 2025 Season
            </div>

            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(3.5rem, 9vw, 7rem)',
              lineHeight: 0.95,
              letterSpacing: '0.02em',
              marginBottom: '1.5rem',
            }}>
              <span style={{ color: 'var(--white)' }}>CONCORD</span>
              <br />
              <span style={{
                color: 'var(--gold)',
                WebkitTextStroke: '0px',
                textShadow: '0 0 60px rgba(240,165,0,0.3)',
              }}>WARRIORS</span>
              <br />
              <span style={{
                fontSize: '0.45em',
                color: 'var(--grey)',
                letterSpacing: '0.3em',
              }}>CRICKET CLUB</span>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--grey)',
              maxWidth: '520px',
              marginBottom: '2.5rem',
              lineHeight: 1.7,
            }}>
              Competitive cricket with an inclusive culture. At least 3 major tournaments per year,
              15-member teams for batting &amp; bowling cores, and a community that values skills at every level.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/membership" className="btn btn-primary">Join the Warriors</Link>
              <Link href="/fixtures" className="btn btn-outline">View Fixtures</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{
        background: 'var(--navy-light)',
        borderTop: '1px solid rgba(240,165,0,0.2)',
        borderBottom: '1px solid rgba(240,165,0,0.2)',
        padding: '1.5rem 0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            textAlign: 'center',
          }}>
            {[
              { num: '3+', label: 'Tournaments/Year' },
              { num: '15', label: 'Team Members' },
              { num: '2+', label: 'Social Events' },
              { num: '∞', label: 'Passion' },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '2.5rem',
                  color: 'var(--gold)',
                  lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--grey)',
                  marginTop: '0.25rem',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING FIXTURES */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <h2 className="section-title">Upcoming Fixtures</h2>
            <Link href="/fixtures" style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>View All →</Link>
          </div>

          {loading ? (
            <div className="loading-wrap"><div className="spinner" /></div>
          ) : fixtures.length > 0 ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {fixtures.map((f, i) => (
                <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.1rem' }}>{f.teams || f.match}</div>
                    {f.venue && <div style={{ color: 'var(--grey)', fontSize: '0.85rem', marginTop: '0.25rem' }}>📍 {f.venue}</div>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--gold)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 }}>{f.date}</div>
                    <span className="badge badge-upcoming">Upcoming</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="error-msg">
              <p>Live fixtures loading from CricClubs. <a href="https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964" target="_blank" rel="noopener noreferrer">View on CricClubs ↗</a></p>
            </div>
          )}
        </div>
      </section>

      {/* RECENT RESULTS */}
      <section style={{ padding: '0 0 5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <h2 className="section-title">SKY League Results</h2>
            <Link href="/results" style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>View All →</Link>
          </div>

          {loading ? (
            <div className="loading-wrap"><div className="spinner" /></div>
          ) : results.length > 0 ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {results.map((r, i) => (
                <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '1.1rem' }}>{r.match || r.teams || (r.raw && r.raw[1]) || 'Match'}</div>
                    <div style={{ color: 'var(--grey)', fontSize: '0.85rem', marginTop: '0.25rem' }}>{r.date}</div>
                  </div>
                  <span className={`badge ${r.result?.toLowerCase().includes('won') || r.result?.toLowerCase().includes('win') ? 'badge-win' : r.result?.toLowerCase().includes('lost') || r.result?.toLowerCase().includes('loss') ? 'badge-loss' : 'badge-upcoming'}`}>
                    {r.result || 'Result'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="error-msg">
              <p>Live results loading from CricClubs. <a href="https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964" target="_blank" rel="noopener noreferrer">View on CricClubs ↗</a></p>
            </div>
          )}
        </div>
      </section>

      {/* WHY JOIN */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(180deg, transparent, var(--navy-mid), transparent)',
      }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '3rem' }}>Why Join the Warriors?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🏆', title: 'Tourney Action', desc: 'At least 3 major tournaments per year — competitive cricket all season.' },
              { icon: '🤝', title: 'Equal Opportunity', desc: '15-member teams with dedicated batting and bowling cores.' },
              { icon: '🎉', title: 'Social Events', desc: 'Post-match gatherings and 2+ major social events per year.' },
              { icon: '🌍', title: 'Inclusive Culture', desc: 'We value skills at every level. All backgrounds welcome.' },
            ].map(f => (
              <div key={f.title} className="card">
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '1.4rem',
                  color: 'var(--gold)',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.06em',
                }}>{f.title}</h3>
                <p style={{ color: 'var(--grey)', fontSize: '0.95rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--navy-light) 0%, var(--navy-mid) 100%)',
            border: '1px solid rgba(240,165,0,0.3)',
            borderRadius: '12px',
            padding: '4rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)',
              width: '400px', height: '400px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(240,165,0,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: 'var(--white)',
              marginBottom: '1rem',
              letterSpacing: '0.05em',
            }}>Ready to Play?</h2>
            <p style={{ color: 'var(--grey)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              Join the Concord Warriors today. Full membership from $99/year or flex from $49/year.
            </p>
            <Link href="/membership" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
