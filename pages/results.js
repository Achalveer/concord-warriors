import { useState } from 'react';
import Head from 'next/head';

const LEAGUES = [
  {
    id: 'sky',
    label: 'SKY League',
    tag: 'Latest',
    matchesUrl: 'https://cricclubs.com/SKYLeague/listMatches.do?clubId=1118462',
    standingsUrl: 'https://cricclubs.com/SKYLeague/viewPointsTable.do?clubId=1118462',
  },
  {
    id: 'current',
    label: 'CCC5 League',
    tag: null,
    matchesUrl: 'https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964',
    standingsUrl: 'https://cricclubs.com/viewStanding.do?league=20&clubId=1102964',
  },
];

export default function Results() {
  const [activeLeague, setActiveLeague] = useState('sky');
  const [view, setView] = useState('matches'); // 'matches' | 'standings'

  const league = LEAGUES.find(l => l.id === activeLeague);
  const iframeUrl = view === 'standings' ? league.standingsUrl : league.matchesUrl;

  return (
    <>
      <Head>
        <title>Results — Concord Warriors Cricket Club</title>
      </Head>

      <div style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Results & Standings</h1>
            <p style={{ color: 'var(--grey)', marginTop: '0.5rem' }}>Live data from CricClubs</p>
          </div>

          {/* League Tabs */}
          <div style={{
            display: 'flex', gap: '0.5rem', marginBottom: '0',
            borderBottom: '1px solid rgba(240,165,0,0.15)',
          }}>
            {LEAGUES.map(l => (
              <button key={l.id} onClick={() => setActiveLeague(l.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.75rem 1.5rem',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: '1rem',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: activeLeague === l.id ? 'var(--gold)' : 'var(--grey)',
                borderBottom: activeLeague === l.id ? '3px solid var(--gold)' : '3px solid transparent',
                transition: 'color 0.2s',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                {l.label}
                {l.tag && (
                  <span style={{
                    background: 'var(--gold)', color: 'var(--navy)',
                    fontSize: '0.6rem', padding: '1px 6px', borderRadius: '10px',
                    fontWeight: 700, letterSpacing: '0.1em',
                  }}>{l.tag}</span>
                )}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div style={{
            display: 'flex', gap: '0.5rem',
            margin: '1.5rem 0',
          }}>
            {['matches', 'standings'].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                background: view === v ? 'var(--gold)' : 'transparent',
                color: view === v ? 'var(--navy)' : 'var(--grey)',
                border: '1px solid rgba(240,165,0,0.3)',
                borderRadius: '4px',
                padding: '0.4rem 1.25rem',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: '0.9rem',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
                {v === 'matches' ? '📋 Matches' : '🏆 Standings'}
              </button>
            ))}
          </div>

          {/* CricClubs iframe */}
          <div style={{
            background: 'var(--navy-mid)',
            border: '1px solid rgba(240,165,0,0.2)',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Header bar */}
            <div style={{
              background: 'var(--navy-light)',
              borderBottom: '1px solid rgba(240,165,0,0.15)',
              padding: '0.75rem 1.25rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '0.85rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--gold)',
              }}>
                {league.label} — {view === 'matches' ? 'Match Results' : 'Points Table'}
              </span>
              <a href={iframeUrl} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '0.8rem', color: 'var(--grey)',
                letterSpacing: '0.05em',
              }}>
                Open full page ↗
              </a>
            </div>
            <iframe
              key={iframeUrl}
              src={iframeUrl}
              style={{
                width: '100%',
                height: '600px',
                border: 'none',
                display: 'block',
                background: '#fff',
              }}
              title={`${league.label} ${view}`}
            />
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'right' }}>
            <a href={iframeUrl} target="_blank" rel="noopener noreferrer" style={{
              color: 'var(--grey)', fontSize: '0.8rem',
            }}>
              Having trouble viewing? Open on CricClubs ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
