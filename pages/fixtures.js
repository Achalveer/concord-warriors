import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Fixtures() {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/cricclubs?type=fixtures')
      .then(r => r.json())
      .then(d => {
        setFixtures(d.data || []);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Fixtures — Concord Warriors Cricket Club</title>
      </Head>

      <div style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem' }}>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Fixtures</h1>
            <p style={{ color: 'var(--grey)', marginTop: '0.5rem' }}>
              Upcoming matches — live from{' '}
              <a
                href="https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964"
                target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--gold)' }}
              >CricClubs</a>
            </p>
          </div>

          {loading && (
            <div className="loading-wrap">
              <div className="spinner" />
              <p>Loading fixtures from CricClubs...</p>
            </div>
          )}

          {!loading && error && (
            <div className="error-msg">
              <p>Could not load fixtures automatically.</p>
              <p style={{ marginTop: '1rem' }}>
                <a href="https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964"
                  target="_blank" rel="noopener noreferrer">
                  View fixtures directly on CricClubs ↗
                </a>
              </p>
            </div>
          )}

          {!loading && !error && fixtures.length === 0 && (
            <div className="error-msg">
              <p>No upcoming fixtures found.</p>
              <p style={{ marginTop: '1rem' }}>
                <a href="https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964"
                  target="_blank" rel="noopener noreferrer">
                  Check CricClubs directly ↗
                </a>
              </p>
            </div>
          )}

          {!loading && fixtures.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Match</th>
                    <th>Venue</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fixtures.map((f, i) => (
                    <tr key={i}>
                      <td style={{ whiteSpace: 'nowrap', color: 'var(--gold)' }}>{f.date}</td>
                      <td style={{ fontWeight: 600 }}>{f.teams || f.match}</td>
                      <td style={{ color: 'var(--grey)' }}>{f.venue || '—'}</td>
                      <td><span className="badge badge-upcoming">Upcoming</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <a
              href="https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-outline"
            >
              View Full Schedule on CricClubs ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
