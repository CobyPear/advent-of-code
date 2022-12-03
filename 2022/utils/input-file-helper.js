const fs = require('fs')
const path = require('path')
module.exports = (file) => fs.readFileSync(path.resolve(file), 'utf8')


