/* eslint-disable semi */
const pkg = require('./dist/filter-parser');

module.exports = pkg.default;
delete pkg.default;
Object.assign(module.exports, pkg);
