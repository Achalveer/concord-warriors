// pages/api/cricclubs.js
// Multi-league proxy for CricClubs data

const fetch = require('node-fetch');
const cheerio = require('cheerio');

const BASE = 'https://cricclubs.com';

// League configs
const LEAGUES = {
  current: {
    label: 'Current League',
    teamId: '462',
    leagueId: '20',
    clubId: '1102964',
    slug: null, // uses teamId-based URLs
  },
  sky: {
    label: 'SKY League',
    teamId: null,
    leagueId: null,
    clubId: '1118462',
    slug: 'SKYLeague', // uses slug-based URLs
  },
};

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://cricclubs.com/',
  'Connection': 'keep-alive',
};

async function fetchPage(url) {
  const res = await fetch(url, { headers: HEADERS, timeout: 12000 });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ---- Parse a generic matches/results table ----
function parseMatchTable($) {
  const matches = [];

  $('table').each((ti, table) => {
    const headers = $(table).find('th').map((i, el) => $(el).text().trim().toLowerCase()).get();
    const isMatchTable = headers.some(h =>
      h.includes('date') || h.includes('match') || h.includes('vs') ||
      h.includes('team') || h.includes('result') || h.includes('score')
    );
    if (!isMatchTable && headers.length === 0) {
      // also try tables with no headers but rows with 3+ cells
    } else if (!isMatchTable) return;

    $(table).find('tr').each((i, row) => {
      const cells = $(row).find('td');
      if (cells.length < 2) return;
      const rowData = cells.map((j, cell) => $(cell).text().replace(/\s+/g, ' ').trim()).get();
      // Filter out empty rows and header-like rows
      if (!rowData.some(c => c.length > 1)) return;
      if (rowData[0].toLowerCase().includes('date') || rowData[0].toLowerCase().includes('#')) return;

      matches.push({
        date: rowData[0] || '',
        teams: rowData[1] || '',
        score: rowData[2] || '',
        result: rowData[rowData.length - 1] || '',
        raw: rowData,
      });
    });
  });

  return matches;
}

// ---- SKYLeague: list matches ----
async function getSKYLeagueMatches() {
  const url = `${BASE}/SKYLeague/listMatches.do?clubId=1118462`;
  const html = await fetchPage(url);
  const $ = cheerio.load(html);
  const matches = [];

  // CricClubs listMatches page structure
  $('table tr').each((i, row) => {
    const cells = $(row).find('td');
    if (cells.length < 3) return;
    const rowData = cells.map((j, cell) => {
      // Get text including links
      return $(cell).text().replace(/\s+/g, ' ').trim();
    }).get();

    if (!rowData[0] || rowData[0].toLowerCase() === 'date' || rowData[0].toLowerCase() === '#') return;
    if (rowData.every(c => c.length === 0)) return;

    // Try to detect match link for scorecard
    const link = $(row).find('a').first().attr('href') || '';

    matches.push({
      date: rowData[0] || '',
      teams: rowData[1] || rowData[2] || '',
      score: rowData[2] || rowData[3] || '',
      result: rowData[rowData.length - 1] || '',
      scorecardUrl: link ? `${BASE}${link}` : '',
      raw: rowData,
      league: 'SKY League',
    });
  });

  // Also try div/list-based layouts
  if (matches.length === 0) {
    $('.match-row, .fixture-row, [class*="match"], [class*="fixture"]').each((i, el) => {
      const text = $(el).text().replace(/\s+/g, ' ').trim();
      if (text.length > 5) {
        matches.push({ teams: text, league: 'SKY League', raw: [text] });
      }
    });
  }

  return matches;
}

// ---- SKYLeague: standings ----
async function getSKYLeagueStandings() {
  const url = `${BASE}/SKYLeague/viewPointsTable.do?clubId=1118462`;
  const html = await fetchPage(url);
  const $ = cheerio.load(html);
  const standings = [];

  $('table tr').each((i, row) => {
    const cells = $(row).find('td');
    if (cells.length < 3) return;
    const rowData = cells.map((j, cell) => $(cell).text().replace(/\s+/g, ' ').trim()).get();
    if (!rowData[0] || /^(#|pos|rank|team)/i.test(rowData[0])) return;
    if (rowData.every(c => c.length === 0)) return;

    standings.push({
      pos: rowData[0],
      team: rowData[1] || '',
      played: rowData[2] || '',
      won: rowData[3] || '',
      lost: rowData[4] || '',
      tied: rowData[5] || '',
      points: rowData[rowData.length - 1] || '',
      league: 'SKY League',
    });
  });

  return standings;
}

// ---- Current league fixtures ----
async function getFixtures(league) {
  const cfg = LEAGUES[league] || LEAGUES.current;
  const url = cfg.slug
    ? `${BASE}/${cfg.slug}/viewSchedule.do?clubId=${cfg.clubId}`
    : `${BASE}/viewSchedule.do?teamId=${cfg.teamId}&league=${cfg.leagueId}&clubId=${cfg.clubId}`;
  const html = await fetchPage(url);
  const $ = cheerio.load(html);
  const fixtures = [];

  $('table tr').each((i, row) => {
    const cells = $(row).find('td');
    if (cells.length < 2) return;
    const rowData = cells.map((j, cell) => $(cell).text().replace(/\s+/g, ' ').trim()).get();
    if (!rowData[0] || rowData[0].toLowerCase() === 'date') return;
    if (rowData.every(c => c.length === 0)) return;
    fixtures.push({ date: rowData[0], teams: rowData[1] || '', venue: rowData[2] || '', status: 'upcoming' });
  });

  return fixtures;
}

// ---- Current league results ----
async function getResults(league) {
  const cfg = LEAGUES[league] || LEAGUES.current;
  const url = cfg.slug
    ? `${BASE}/${cfg.slug}/listMatches.do?clubId=${cfg.clubId}`
    : `${BASE}/viewTeam.do?teamId=${cfg.teamId}&league=${cfg.leagueId}&clubId=${cfg.clubId}`;
  const html = await fetchPage(url);
  const $ = cheerio.load(html);
  return parseMatchTable($);
}

// ---- Squad ----
async function getSquad() {
  const cfg = LEAGUES.current;
  const url = `${BASE}/viewTeam.do?teamId=${cfg.teamId}&league=${cfg.leagueId}&clubId=${cfg.clubId}`;
  const html = await fetchPage(url);
  const $ = cheerio.load(html);
  const players = [];
  const seen = new Set();

  $('table tr').each((i, row) => {
    const cells = $(row).find('td');
    if (cells.length < 2) return;
    const name = $(cells[0]).text().trim();
    const role = $(cells[1]).text().trim();
    if (name && name.length > 2 && name.length < 60 && !/^\d+$/.test(name) && !seen.has(name)) {
      seen.add(name);
      players.push({ name, role });
    }
  });

  return players;
}

// ---- Standings ----
async function getStandings(league) {
  const cfg = LEAGUES[league] || LEAGUES.current;
  const url = cfg.slug
    ? `${BASE}/${cfg.slug}/viewPointsTable.do?clubId=${cfg.clubId}`
    : `${BASE}/viewStanding.do?league=${cfg.leagueId}&clubId=${cfg.clubId}`;
  const html = await fetchPage(url);
  const $ = cheerio.load(html);
  const standings = [];

  $('table tr').each((i, row) => {
    const cells = $(row).find('td');
    if (cells.length < 3) return;
    const rowData = cells.map((j, cell) => $(cell).text().replace(/\s+/g, ' ').trim()).get();
    if (!rowData[0] || /^(#|pos|rank)/i.test(rowData[0])) return;
    if (rowData.every(c => c.length === 0)) return;
    standings.push({
      pos: rowData[0], team: rowData[1] || '',
      played: rowData[2] || '', won: rowData[3] || '',
      lost: rowData[4] || '', points: rowData[rowData.length - 1] || '',
    });
  });

  return standings;
}

export default async function handler(req, res) {
  const { type, league = 'current' } = req.query;
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');

  try {
    let data;

    // SKYLeague-specific fetchers
    if (league === 'sky') {
      switch (type) {
        case 'results':   data = await getSKYLeagueMatches(); break;
        case 'standings': data = await getSKYLeagueStandings(); break;
        case 'fixtures':  data = await getFixtures('sky'); break;
        default: return res.status(400).json({ error: 'Invalid type for sky league' });
      }
    } else {
      switch (type) {
        case 'fixtures':  data = await getFixtures(league); break;
        case 'results':   data = await getResults(league); break;
        case 'squad':     data = await getSquad(); break;
        case 'standings': data = await getStandings(league); break;
        default: return res.status(400).json({ error: 'Invalid type' });
      }
    }

    res.status(200).json({
      success: true,
      data,
      league,
      leagueLabel: LEAGUES[league]?.label || league,
      count: data.length,
    });
  } catch (err) {
    console.error('CricClubs error:', err.message);
    res.status(500).json({ success: false, error: err.message, data: [] });
  }
}
