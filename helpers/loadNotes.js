// Required Node packages
const fs = require('fs');
const util = require("util");
const readFile = util.promisify(fs.readFile);

module.exports = function () {
    return readFile("db/db.json", "UTF-8").then(rawNotes => [].concat(JSON.parse(rawNotes)))
}