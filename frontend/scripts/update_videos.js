const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(dirPath);
    });
}

walk('c:/Users/Yesid Farfan/Documents/Proyectos/Externos/unal/frontend/src', function (filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        const regex = /<PlayVideoButton([^>]*)>/g;
        content = content.replace(regex, (match, propsString) => {
            // Normalize spaces
            let p = propsString.replace(/\s+/g, ' ');

            // Remove size and className
            p = p.replace(/\s+size=(?:"[^"]*"|'[^']*'|{[^}]*})/g, '');
            p = p.replace(/\s+className=(?:"[^"]*"|'[^']*'|{[^}]*})/g, '');

            // Update or add videoId
            if (p.match(/\s+videoId=/)) {
                p = p.replace(/\s+videoId=(?:"[^"]*"|'[^']*'|{[^}]*})/, ' videoId="/pag1/vv-1"');
            } else {
                // If it ends with / (self-closing), insert before it
                if (p.trim().endsWith('/')) {
                    p = p.trim().slice(0, -1).trim() + ' videoId="/pag1/vv-1" /';
                } else {
                    p = p.trim() + ' videoId="/pag1/vv-1"';
                }
            }

            // Clean up double spaces that might have been introduced
            p = p.replace(/\s+/g, ' ').trim();
            if (p) p = ' ' + p;

            return `<PlayVideoButton${p}>`;
        });

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated', filePath);
        }
    }
});
