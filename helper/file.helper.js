const fs = require('node:fs');

const readFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

const writeFile = (filePath, data) => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);
}

module.exports = {
    readFile,
    writeFile
}