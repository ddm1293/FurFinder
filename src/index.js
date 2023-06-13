import dotenv from 'dotenv';
import { createServer } from './utils/serverSetup.js';

dotenv.config();

(async () => {
  await createServer(process.env.PORT, process.env.MONGODB_CONNECTION_STRING);
})();
