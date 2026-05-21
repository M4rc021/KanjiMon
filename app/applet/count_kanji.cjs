const fs = require('fs');
let n4 = fs.readFileSync('/app/applet/n4.html', 'utf8');
let kanjis = n4.match(/kanji:\s*".*?"/g);
console.log(kanjis.length);
