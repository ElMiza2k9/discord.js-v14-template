import 'dotenv/config';
import { Client } from 'structs/Client';

new Client()
  .login()
  .then(() => console.log('Bot iniciado'))
  .catch(console.error);
