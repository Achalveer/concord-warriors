import Head from 'next/head';

const SQUAD_URL = 'https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964';
const SKY_SQUAD_URL = 'https://cricclubs.com/SKYLeague/viewTeam.do?clubId=1118462';

import { useState } from 'react';

export default function Squad() {
  const [league, setLeague] = useState('current');
  const url = league === 'sky' ? SKY_SQUAD_URL : SQUAD_URL;

  return (
    <>
      <Head>
        <title>Squad — Concord Warriors Cricket Club</title>
      </Head>

      <div style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>Our Squad</h1>
            <p style={{ color: 'var(--grey)', marginTop: '0.5rem' }}>Player roster — live from CricClubs</p>
          </div>

          <div style={{
            display: 'flex', gap: '0.5rem', marginBottom: '1.5rem',
            borderBottom: '1px solid rgba(240,165,0,0.15)',
          }}>
            {[
              { id: 'current', label: 'CCC5 League' },
              { id: 'sky', label: 'SKY League', tag: 'Latest' },
            ].map(l => (
              <button key={l.id} onClick={() => setLeague(l.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.75rem 1.5rem',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: '1rem',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: league === l.id ? 'var(--gold)' : 'var(--grey)',
                borderBottom: league === l.id ? '3px solid var(--gold)' : '3px solid transparent',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                {l.label}
                {l.tag && (
                  <span style={{
                    background: 'var(--gold)', color: 'var(--navy)',
                    fontSize: '0.6rem', padding: '1px 6px', borderRadius: '10px',
                    fontWeight: 700,
                  }}>{l.tag}</span>
                )}
              </button>
            ))}
          </div>

          <div style={{
            background: 'var(--navy-mid)',
            border: '1px solid rgba(240,165,0,0.2)',
            borderRadius: '12px', overflow: 'hidden',
          }}>
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
              }}>Team Roster</span>
              <a href={url} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '0.8rem', color: 'var(--grey)',
              }}>Open full page ↗</a>
            </div>
            <iframe
              key={url}
              src={url}
              style={{ width: '100%', height: '700px', border: 'none', display: 'block', background: '#fff' }}
              title="Squad"
            />
          </div>
        </div>
      </div>
    </>
  );
}
