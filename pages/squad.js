import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Squad() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cricclubs?type=squad')
      .then(r => r.json())
      .then(d => {
        setPlayers(d.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  const avatarColors = [
    'linear-gradient(135deg, #f0a500, #b07800)',
    'linear-gradient(135deg, #1a3260, #0a1628)',
    'linear-gradient(135deg, #1a5276, #0a1628)',
    'linear-gradient(135deg, #784212, #1a0a00)',
  ];

  return (
    <>
      <Head>
        <title>Squad — Concord Warriors Cricket Club</title>
      </Head>

      <div style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem' }}>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Our Squad</h1>
            <p style={{ color: 'var(--grey)', marginTop: '0.5rem' }}>
              Team roster — live from{' '}
              <a href="https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964"
                target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>CricClubs</a>
            </p>
          </div>

          {loading && (
            <div className="loading-wrap">
              <div className="spinner" />
              <p>Loading squad from CricClubs...</p>
            </div>
          )}

          {!loading && players.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.25rem',
            }}>
              {players.map((p, i) => (
                <div key={i} className="card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: avatarColors[i % avatarColors.length],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.6rem',
                    color: 'var(--white)',
                    margin: '0 auto 1rem',
                    border: '2px solid rgba(240,165,0,0.2)',
                  }}>
                    {getInitials(p.name)}
                  </div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    marginBottom: '0.25rem',
                  }}>{p.name}</div>
                  {p.role && (
                    <div style={{
                      color: 'var(--gold)',
                      fontSize: '0.8rem',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>{p.role}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {!loading && players.length === 0 && (
            <div className="error-msg">
              <p>Squad details are managed on CricClubs.</p>
              <p style={{ marginTop: '1rem' }}>
                <a href="https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964"
                  target="_blank" rel="noopener noreferrer">
                  View squad on CricClubs ↗
                </a>
              </p>
            </div>
          )}

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <a href="https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964"
              target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              View Full Roster on CricClubs ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
