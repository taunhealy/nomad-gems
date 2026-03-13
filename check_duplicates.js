
const fs = require('fs');
const content = fs.readFileSync('k:\\Kea\\nomad-gems\\lib\\data.ts', 'utf8');

const srcRegex = /src:\s*"([^"]+)"/g;
const allSrcs = [];
let match;

while ((match = srcRegex.exec(content)) !== null) {
    allSrcs.push(match[1]);
}

const counts = {};
allSrcs.forEach(src => {
    if (src) {
        counts[src] = (counts[src] || 0) + 1;
    }
});

const duplicates = Object.keys(counts).filter(src => counts[src] > 1);

if (duplicates.length > 0) {
    console.log("Found duplicate sources:");
    duplicates.forEach(src => {
        console.log(`${counts[src]} times: ${src}`);
    });
} else {
    console.log("No duplicate sources found.");
}
