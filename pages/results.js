import { useEffect, useState } from 'react';
import Head from 'next/head';

const LEAGUES = [
  {
    id: 'sky',
    label: 'SKY League',
    tag: 'Latest',
    url: 'https://cricclubs.com/SKYLeague/listMatches.do?clubId=1118462',
  },
  {
    id: 'current',
    label: 'Current League',
    tag: null,
    url: 'https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964',
  },
];

function ResultBadge({ result }) {
  if (!result) return <span className="badge badge-upcoming">—</span>;
  const r = result.toLowerCase();
  if (r.includes('won') || r.includes('win') || r.includes('beat'))
    return <span className="badge badge-win">Won</span>;
  if (r.includes('lost') || r.includes('loss') || r.includes('defeat') || r.includes('no result') === false && r.includes('tied') === false && r.includes('lost'))
    return <span className="badge badge-loss">Lost</span>;
  if (r.includes('tied') || r.includes('draw') || r.includes('no result'))
    return <span className="badge badge-upcoming">Draw</span>;
  // If result is a score or short text, show as-is
  if (result.length < 30) return <span className="badge badge-upcoming">{result}</span>;
  return <span className="badge badge-upcoming">Played</span>;
}

export default function Results() {
  const [activeLeague, setActiveLeague] = useState('sky');
  const [data, setData] = useState({ sky: null, current: null });
  const [standings, setStandings] = useState({ sky: null, current: null });
  const [loading, setLoading] = useState({ sky: false, current: false });

  const load = (leagueId) => {
    if (data[leagueId] !== null) return; // already loaded
    setLoading(prev => ({ ...prev, [leagueId]: true }));
    Promise.all([
      fetch(`/api/cricclubs?type=results&league=${leagueId}`).then(r => r.json()),
      fetch(`/api/cricclubs?type=standings&league=${leagueId}`).then(r => r.json()),
    ]).then(([r, s]) => {
      setData(prev => ({ ...prev, [leagueId]: r.data || [] }));
      setStandings(prev => ({ ...prev, [leagueId]: s.data || [] }));
      setLoading(prev => ({ ...prev, [leagueId]: false }));
    }).catch(() => {
      setData(prev => ({ ...prev, [leagueId]: [] }));
      setLoading(prev => ({ ...prev, [leagueId]: false }));
    });
  };

  useEffect(() => { load('sky'); }, []);

  const handleTab = (id) => {
    setActiveLeague(id);
    load(id);
  };

  const league = LEAGUES.find(l => l.id === activeLeague);
  const results = data[activeLeague];
  const stand = standings[activeLeague];
  const isLoading = loading[activeLeague];

  return (
    <>
      <Head>
        <title>Results — Concord Warriors Cricket Club</title>
      </Head>

      <div style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Results</h1>
            <p style={{ color: 'var(--grey)', marginTop: '0.5rem' }}>
              Match results &amp; standings across all leagues
            </p>
          </div>

          {/* League Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid rgba(240,165,0,0.15)',
            paddingBottom: '0',
          }}>
            {LEAGUES.map(l => (
              <button
                key={l.id}
                onClick={() => handleTab(l.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.75rem 1.5rem',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: activeLeague === l.id ? 'var(--gold)' : 'var(--grey)',
                  borderBottom: activeLeague === l.id ? '3px solid var(--gold)' : '3px solid transparent',
                  transition: 'color 0.2s',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                {l.label}
                {l.tag && (
                  <span style={{
                    background: 'var(--gold)',
                    color: 'var(--navy)',
                    fontSize: '0.6rem',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                  }}>{l.tag}</span>
                )}
              </button>
            ))}
          </div>

          {/* Source link */}
          <p style={{ color: 'var(--grey)', fontSize: '0.85rem', marginBottom: '2rem' }}>
            Live data from{' '}
            <a href={league.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>
              CricClubs — {league.label} ↗
            </a>
          </p>

          {/* Loading */}
          {isLoading && (
            <div className="loading-wrap">
              <div className="spinner" />
              <p>Loading {league.label} data...</p>
            </div>
          )}

          {/* Standings */}
          {!isLoading && stand && stand.length > 0 && (
            <div style={{ marginBottom: '4rem' }}>
              <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
                {league.label} — Standings
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: 48 }}>#</th>
                      <th>Team</th>
                      <th>P</th>
                      <th>W</th>
                      <th>L</th>
                      <th>Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stand.map((s, i) => {
                      const isUs = (s.team || '').toLowerCase().includes('concord') ||
                                   (s.team || '').toLowerCase().includes('warrior');
                      return (
                        <tr key={i} style={isUs ? { background: 'rgba(240,165,0,0.07)' } : {}}>
                          <td style={{ color: 'var(--gold)', fontWeight: 700 }}>{s.pos || i + 1}</td>
                          <td style={{ fontWeight: isUs ? 700 : 400 }}>
                            {isUs && <span style={{ color: 'var(--gold)', marginRight: 6 }}>⚡</span>}
                            {s.team}
                          </td>
                          <td>{s.played}</td>
                          <td style={{ color: '#2ecc71' }}>{s.won}</td>
                          <td style={{ color: '#e74c3c' }}>{s.lost}</td>
                          <td style={{ color: 'var(--gold)', fontWeight: 700 }}>{s.points}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Match Results */}
          {!isLoading && results && results.length > 0 && (
            <>
              <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
                {league.label} — Matches
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Match</th>
                      <th>Score</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={i}>
                        <td style={{ whiteSpace: 'nowrap', color: 'var(--gold)', fontSize: '0.9rem' }}>{r.date || '—'}</td>
                        <td style={{ fontWeight: 600, maxWidth: 280 }}>
                          {r.scorecardUrl
                            ? <a href={r.scorecardUrl} target="_blank" rel="noopener noreferrer"
                                 style={{ color: 'var(--white)' }}>{r.teams || r.match || '—'}</a>
                            : (r.teams || r.match || (r.raw && r.raw[1]) || '—')
                          }
                        </td>
                        <td style={{ color: 'var(--grey)', fontSize: '0.88rem' }}>{r.score || '—'}</td>
                        <td><ResultBadge result={r.result} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Empty state */}
          {!isLoading && results !== null && results.length === 0 && (
            <div className="error-msg">
              <p>No match data found — results are updated live after each game.</p>
              <p style={{ marginTop: '1rem' }}>
                <a href={league.url} target="_blank" rel="noopener noreferrer">
                  View on CricClubs directly ↗
                </a>
              </p>
            </div>
          )}

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <a href={league.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Full Scorecard on CricClubs ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
