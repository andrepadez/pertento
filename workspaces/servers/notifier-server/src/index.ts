import { connect } from 'formik';
import { disconnect } from 'pm2';

const { NOTIFIER_PORT: PORT } = process.env;

const server = Bun.serve({
  port: PORT,

  fetch(req, server) {
    const success = server.upgrade(req);
    if (success) {
      // Bun automatically returns a 101 Switching Protocols
      // if the upgrade succeeds
      return undefined;
    }

    // handle HTTP request normally
    const id = crypto.randomBytes(16).toString('hex');
    return new Response({ id: id, message: 'Hello, world!' });
  },
  websocket: {
    // this is called when a message is received
    async message(ws, message) {
      console.log(`Received ${message}`);
      // send back a message
      ws.send(`You said: ${message}`);
    },
    open(ws) {
      console.log('A socket is opened', ws.id);
    },
    close(ws, code, message) {
      console.log('A socket is closed', ws.id);
    },
    drain(ws) {
      console.log('A socket is drained', ws.id);
    },
  },
});

console.log(`PERTENTO NOTIFIER server listening on port ${PORT}`);
