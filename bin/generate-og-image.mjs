import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const width = 1200;
const height = 630;

// Render logo SVG to a PNG buffer
const logoSvgPath = path.resolve('public/logo-full-on-dark.svg');
const logoBuffer = await sharp(logoSvgPath)
  .resize({ height: 72 })
  .png()
  .toBuffer();

// Create background card and typography as standalone valid SVG
const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#142848" stop-opacity="0.8"/>
      <stop offset="60%" stop-color="#080F1D" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#05080F" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#41C8FF"/>
      <stop offset="100%" stop-color="#8ECAE6"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(65, 200, 255, 0.4)"/>
      <stop offset="100%" stop-color="rgba(255, 255, 255, 0.05)"/>
    </linearGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="${width}" height="${height}" fill="#05080F"/>
  <rect width="${width}" height="${height}" fill="url(#bgGlow)"/>

  <!-- Subtle Grid Pattern -->
  <g opacity="0.06" stroke="#41C8FF" stroke-width="1">
    <line x1="0" y1="105" x2="${width}" y2="105"/>
    <line x1="0" y1="210" x2="${width}" y2="210"/>
    <line x1="0" y1="315" x2="${width}" y2="315"/>
    <line x1="0" y1="420" x2="${width}" y2="420"/>
    <line x1="0" y1="525" x2="${width}" y2="525"/>
    <line x1="200" y1="0" x2="200" y2="${height}"/>
    <line x1="400" y1="0" x2="400" y2="${height}"/>
    <line x1="600" y1="0" x2="600" y2="${height}"/>
    <line x1="800" y1="0" x2="800" y2="${height}"/>
    <line x1="1000" y1="0" x2="1000" y2="${height}"/>
  </g>

  <!-- Status Pill (Top Right) -->
  <g transform="translate(860, 68)">
    <rect width="260" height="40" rx="20" fill="#0A1424" stroke="#41C8FF" stroke-opacity="0.3" stroke-width="1.5"/>
    <circle cx="24" cy="20" r="4.5" fill="#3DD68C"/>
    <text x="38" y="25" fill="#E2E8F0" font-family="sans-serif" font-size="12" font-weight="600" letter-spacing="1">INFRASTRUCTURE ACTIVE</text>
  </g>

  <!-- Main Headline -->
  <text x="80" y="240" fill="#FFFFFF" font-family="sans-serif" font-size="52" font-weight="800" letter-spacing="-1">
    Stop Losing Revenue to
  </text>
  <text x="80" y="305" fill="url(#skyGrad)" font-family="sans-serif" font-size="52" font-weight="800" letter-spacing="-1">
    Burnt Domains and Calendar Drop-Offs.
  </text>

  <!-- Subtitle Tagline -->
  <text x="80" y="380" fill="#94A3B8" font-family="sans-serif" font-size="24" font-weight="500">
    Cold outreach, deliverability protection, and no-show recovery in one platform.
  </text>

  <!-- Feature Badges -->
  <g transform="translate(80, 435)">
    <rect x="0" y="0" width="240" height="44" rx="8" fill="#0D192D" stroke="url(#borderGrad)" stroke-width="1"/>
    <text x="24" y="28" fill="#E2E8F0" font-family="sans-serif" font-size="15" font-weight="600">50–250+ Mailboxes</text>

    <rect x="260" y="0" width="240" height="44" rx="8" fill="#0D192D" stroke="url(#borderGrad)" stroke-width="1"/>
    <text x="284" y="28" fill="#E2E8F0" font-family="sans-serif" font-size="15" font-weight="600">Continuous DNS Health</text>

    <rect x="520" y="0" width="240" height="44" rx="8" fill="#0D192D" stroke="url(#borderGrad)" stroke-width="1"/>
    <text x="544" y="28" fill="#E2E8F0" font-family="sans-serif" font-size="15" font-weight="600">In-Email Calendar Sync</text>
  </g>

  <!-- Divider Ribbon -->
  <line x1="80" y1="525" x2="1120" y2="525" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>

  <!-- Footer Info -->
  <text x="80" y="565" fill="#64748B" font-family="sans-serif" font-size="14" font-weight="500">
    SYNCLEAD LTD · LONDON, ENGLAND · HIGH-CONVERTING OUTBOUND INFRASTRUCTURE
  </text>

  <g transform="translate(970, 542)">
    <rect width="150" height="38" rx="19" fill="#0C1B33" stroke="#41C8FF" stroke-width="1.5"/>
    <text x="32" y="24" fill="#41C8FF" font-family="sans-serif" font-size="14" font-weight="700" letter-spacing="0.5">synclead.io</text>
  </g>
</svg>
`;

async function generate() {
  const outputPath = path.resolve('public/og-image.png');
  const baseImgBuffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();

  await sharp(baseImgBuffer)
    .composite([
      {
        input: logoBuffer,
        top: 60,
        left: 80,
      },
    ])
    .png({ quality: 95, compressionLevel: 8 })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`Successfully generated public/og-image.png: ${stats.size} bytes (${(stats.size / 1024).toFixed(1)} KB)`);
}

generate().catch(console.error);
