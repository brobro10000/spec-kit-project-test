// Concatenate the key spec files + PUML source into one agent-ready context.
import fs from 'node:fs';

const manifest = JSON.parse(fs.readFileSync('.spec/context.manifest.json', 'utf8'));
const pieces = [];

for (const p of manifest.include) {
    pieces.push(`\n\n----- FILE: ${p} -----\n\n`);
    pieces.push(fs.readFileSync(p, 'utf8'));
}

fs.mkdirSync('.spec/.out', { recursive: true });
fs.writeFileSync('.spec/.out/context.bundle.txt', pieces.join(''), 'utf8');

console.log('Wrote .spec/.out/context.bundle.txt');
