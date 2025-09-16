#!/usr/bin/env node
// Concatenate the key context files into one bundle for the agent.
import fs from 'node:fs';
import path from 'node:path';

const manifestPath = path.resolve('.ai/context.manifest.json');
if (!fs.existsSync(manifestPath)) {
    console.error(`Missing ${manifestPath}`);
    process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const pieces = [];
for (const p of manifest.include) {
    if (!fs.existsSync(p)) {
        console.warn(`[warn] Skipping missing file: ${p}`);
        continue;
    }
    pieces.push(`\n\n----- FILE: ${p} -----\n\n`);
    pieces.push(fs.readFileSync(p, 'utf8'));
}

fs.mkdirSync('.ai/out', { recursive: true });
const outFile = '.ai/out/context.bundle.txt';
fs.writeFileSync(outFile, pieces.join(''), 'utf8');
console.log(`Wrote ${outFile}`);
