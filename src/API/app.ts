import 'reflect-metadata';
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

import './controllers/index';
import { container } from './infrastructure/di/Container';
import { DbContext } from '../Data/DbContext';

import getServer from './server';

const dbContext = container.get<DbContext>('DbContext');

dbContext
  .connect()
  .then(() => {
    const app = getServer();
    const port = 3010;
    app.listen(port, () => {
      console.log(`Server is started on ${port} port`);
    });
  })
  .catch((err) => console.error(err));
