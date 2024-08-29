const {spawn} = require('child_process');
const path = require('path');
const NODE_PATH = '/usr/local/bin/node'

const runServer = async (port) => {
  const serverPath = path.resolve(__dirname, '../../main.js');
  const server = spawn(NODE_PATH, [serverPath], {
    env: {
      ...process.env,
      PDFLIBS_PORT: port,
      NODE_ENV: 'development'
    },
  });

  await new Promise((resolve) => {
    server.stdout.on('data', (data) => {
      resolve();
    });
  });

  return server;
};

module.exports = runServer;
