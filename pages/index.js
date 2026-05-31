import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Concord Warriors Cricket Club</title>
        <meta name="description" content="Concord Warriors Cricket Club — Join the Warriors! Tournaments, fixtures, results and squad." />
      </Head>

      {/* HERO */}
      <section style={{
        minHeight: '90vh',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        background: `
          radial-gradient(ellipse at 65% 40%, rgba(240,165,0,0.07) 0%, transparent 55%),
          linear-gradient(180deg, var(--navy) 0%, var(--navy-mid) 100%)
        `,
      }}>
        {/* Decorative rings */}
        <div style={{ position:'absolute', right:'-5%', top:'50%', transform:'translateY(-50%)', width:'550px', height:'550px', borderRadius:'50%', border:'1.5px solid rgba(240,165,0,0.05)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:'5%', top:'50%', transform:'translateY(-50%)', width:'400px', height:'400px', borderRadius:'50%', border:'1px solid rgba(240,165,0,0.04)', pointerEvents:'none' }} />

        <div className="container" style={{ paddingTop:'4rem', paddingBottom:'4rem' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:'2rem', alignItems:'center', maxWidth:'900px' }}>
            <div>
              <div style={{
                display:'inline-flex', alignItems:'center', gap:'0.5rem',
                background:'rgba(240,165,0,0.1)', border:'1px solid rgba(240,165,0,0.25)',
                borderRadius:'20px', padding:'0.35rem 1rem', marginBottom:'1.5rem',
                fontFamily:"'Barlow Condensed', sans-serif", fontSize:'0.85rem',
                letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--gold)',
              }}>
                🏏 Now Recruiting — Join for 2025 Season
              </div>

              <h1 style={{
                fontFamily:"'Bebas Neue', sans-serif",
                fontSize:'clamp(3.5rem, 9vw, 7rem)',
                lineHeight: 0.95, letterSpacing:'0.02em', marginBottom:'1.5rem',
              }}>
                <span style={{ color:'var(--white)' }}>CONCORD</span><br/>
                <span style={{ color:'var(--gold)', textShadow:'0 0 60px rgba(240,165,0,0.25)' }}>WARRIORS</span><br/>
                <span style={{ fontSize:'0.45em', color:'var(--grey)', letterSpacing:'0.3em' }}>CRICKET CLUB</span>
              </h1>

              <p style={{ fontSize:'1.1rem', color:'var(--grey)', maxWidth:'520px', marginBottom:'2.5rem', lineHeight:1.7 }}>
                Competitive cricket with an inclusive culture. At least 3 major tournaments per year,
                15-member teams, and a community that values skills at every level.
              </p>

              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                <Link href="/membership" className="btn btn-primary">Join the Warriors</Link>
                <Link href="/results" className="btn btn-outline">SKY League Results</Link>
              </div>
            </div>

            {/* Logo */}
            <div style={{ display:'flex', justifyContent:'center' }} className="hero-logo">
              <Image
                src="/logo.svg"
                alt="Concord Warriors Cricket Club"
                width={200}
                height={200}
                style={{ filter:'drop-shadow(0 0 40px rgba(240,165,0,0.25))' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{
        background:'var(--navy-light)',
        borderTop:'1px solid rgba(240,165,0,0.2)',
        borderBottom:'1px solid rgba(240,165,0,0.2)',
        padding:'1.5rem 0',
      }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px,1fr))', gap:'1rem', textAlign:'center' }}>
            {[
              { num:'3+', label:'Tournaments/Year' },
              { num:'15', label:'Team Members' },
              { num:'2+', label:'Social Events' },
              { num:'2', label:'Active Leagues' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2.5rem', color:'var(--gold)', lineHeight:1 }}>{s.num}</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'0.8rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--grey)', marginTop:'0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKY LEAGUE RESULTS — live iframe preview */}
      <section style={{ padding:'5rem 0' }}>
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'1.5rem' }}>
            <div>
              <h2 className="section-title">SKY League Results</h2>
              <p style={{ color:'var(--grey)', fontSize:'0.9rem', marginTop:'0.4rem' }}>Latest matches — live from CricClubs</p>
            </div>
            <Link href="/results" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'0.9rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--gold)' }}>
              All Results →
            </Link>
          </div>

          <div style={{ background:'var(--navy-mid)', border:'1px solid rgba(240,165,0,0.2)', borderRadius:'12px', overflow:'hidden' }}>
            <div style={{ background:'var(--navy-light)', borderBottom:'1px solid rgba(240,165,0,0.15)', padding:'0.75rem 1.25rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'0.85rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--gold)' }}>
                SKY League — Match Results
              </span>
              <a href="https://cricclubs.com/SKYLeague/listMatches.do?clubId=1118462" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:'0.8rem', color:'var(--grey)' }}>
                Open on CricClubs ↗
              </a>
            </div>
            <iframe
              src="https://cricclubs.com/SKYLeague/listMatches.do?clubId=1118462"
              style={{ width:'100%', height:'450px', border:'none', display:'block', background:'#fff' }}
              title="SKY League Results"
            />
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section style={{ padding:'0 0 5rem', background:'linear-gradient(180deg, transparent, var(--navy-mid), transparent)' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom:'2.5rem' }}>Why Join the Warriors?</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:'1.25rem' }}>
            {[
              { icon:'🏆', title:'Tourney Action', desc:'At least 3 major tournaments per year — competitive cricket all season.' },
              { icon:'🤝', title:'Equal Opportunity', desc:'15-member teams with dedicated batting and bowling cores.' },
              { icon:'🎉', title:'Social Events', desc:'Post-match gatherings and 2+ major social events per year.' },
              { icon:'🌍', title:'Inclusive Culture', desc:'We value skills at every level. All backgrounds welcome.' },
            ].map(f => (
              <div key={f.title} className="card">
                <div style={{ fontSize:'2.5rem', marginBottom:'0.75rem' }}>{f.icon}</div>
                <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'1.4rem', color:'var(--gold)', marginBottom:'0.5rem', letterSpacing:'0.06em' }}>{f.title}</h3>
                <p style={{ color:'var(--grey)', fontSize:'0.95rem', lineHeight:1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding:'0 0 5rem' }}>
        <div className="container">
          <div style={{
            background:'linear-gradient(135deg, var(--navy-light) 0%, var(--navy-mid) 100%)',
            border:'1px solid rgba(240,165,0,0.3)',
            borderRadius:'12px', padding:'4rem 2rem', textAlign:'center',
            position:'relative', overflow:'hidden',
          }}>
            <div style={{ position:'absolute', top:'-30%', left:'50%', transform:'translateX(-50%)', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(240,165,0,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />
            <Image src="/logo.svg" alt="Logo" width={80} height={80} style={{ marginBottom:'1.5rem', filter:'drop-shadow(0 0 20px rgba(240,165,0,0.3))' }} />
            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(2.5rem,6vw,4.5rem)', color:'var(--white)', marginBottom:'1rem', letterSpacing:'0.05em' }}>Ready to Play?</h2>
            <p style={{ color:'var(--grey)', fontSize:'1.1rem', maxWidth:'500px', margin:'0 auto 2rem' }}>
              Full membership from $99/year or flex from $49/year.
            </p>
            <Link href="/membership" className="btn btn-primary" style={{ fontSize:'1.2rem', padding:'1rem 3rem' }}>
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 600px) {
          .hero-logo { display: none !important; }
        }
      `}</style>
    </>
  );
}
