# Concord Warriors Cricket Club Website

Built with **Next.js**, hosted free on **Vercel**, with live data from **CricClubs**.

## Tech Stack
- **Framework**: Next.js 14
- **Hosting**: Vercel (free tier)
- **Data**: CricClubs API (teamId=462, league=20, clubId=1102964)
- **Styling**: Plain CSS with Google Fonts (Bebas Neue + Barlow)

## Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, upcoming fixtures, recent results, membership CTA |
| Fixtures | `/fixtures` | Full fixtures table from CricClubs |
| Results | `/results` | Match results + league standings |
| Squad | `/squad` | Player roster cards |
| Join Us | `/membership` | Membership tiers + sign-up |

## CricClubs Integration
Data is fetched server-side via `/pages/api/cricclubs.js`, which:
1. Proxies requests to `cricclubs.com` to avoid CORS issues
2. Parses HTML with `cheerio`
3. Returns clean JSON to the frontend
4. Caches responses for 15 minutes (Vercel Edge Cache)

**Team URL**: https://cricclubs.com/viewTeam.do?teamId=462&league=20&clubId=1102964

## Deploy to Vercel (Free)

### Option 1: Vercel CLI
```bash
npm install -g vercel
cd concord-warriors
npm install
vercel
```

### Option 2: GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to https://vercel.com → "Add New Project"
3. Import the GitHub repo
4. Click Deploy — done!

## Local Development
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Customisation
- **Club colors**: Edit `--gold` and `--navy` in `styles/globals.css`
- **CricClubs IDs**: Update `TEAM_ID`, `LEAGUE_ID`, `CLUB_ID` in `pages/api/cricclubs.js`
- **Membership prices**: Edit `pages/membership.js`
- **Logo**: Replace the 🏏 emoji in `Navbar.js` with an `<img>` tag

## Multiple Leagues
To support multiple leagues, update `pages/api/cricclubs.js` to accept
`leagueId` as a query param, and add a league switcher to the fixtures/results pages.
# concord-warriors
