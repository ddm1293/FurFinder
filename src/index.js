import dotenv from 'dotenv';
import { createServer } from './utils/serverSetup.js';

dotenv.config();

(async () => {
  console.log('see env: ', process.env.MONGODB_CONNECTION_STRING);
  await createServer(process.env.PORT, process.env.MONGODB_CONNECTION_STRING);
})();
