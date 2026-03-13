
const fs = require('fs');
const content = fs.readFileSync('k:\\Kea\\nomad-gems\\lib\\data.ts', 'utf8');

const srcRegex = /src:\s*"([^"]+)"/g;
const allSrcMap = {}; // src -> [{type, id, title}]
let match;

// Simple parser for ids and titles near src
const blocks = content.split('},').map(b => b.trim());

blocks.forEach(block => {
    const idMatch = block.match(/id:\s*"([^"]+)"/);
    const titleMatch = block.match(/title:\s*"([^"]+)"/);
    const srcMatch = block.match(/src:\s*"([^"]+)"/);
    if (srcMatch && idMatch) {
        const src = srcMatch[1];
        if (!src) return;
        if (!allSrcMap[src]) allSrcMap[src] = [];
        allSrcMap[src].push({
            id: idMatch[1],
            title: titleMatch ? titleMatch[1] : 'Unknown'
        });
    }
});

const duplicates = Object.keys(allSrcMap).filter(src => allSrcMap[src].length > 1);

if (duplicates.length > 0) {
    console.log("Duplicate sources found across all data:");
    duplicates.forEach(src => {
        console.log(`\nSource: ${src}`);
        allSrcMap[src].forEach(entry => {
            console.log(`  - ID: ${entry.id}, Title: ${entry.title}`);
        });
    });
} else {
    console.log("No duplicate sources found across all data.");
}
