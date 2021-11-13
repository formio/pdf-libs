const {exec} = require('child_process');
const {promisify} = require('util');
const execPromisified = promisify(exec);

module.exports = execPromisified;
