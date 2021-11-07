import path from 'path';
require('dotenv').config({ path: path.resolve('.env') });
import { container } from '../../src/API/infrastructure/di/Container';
import { DbContext } from '../../src/Data/DbContext';

const dbContext = container.get<DbContext>('DbContext');

beforeAll(async () => {
  await dbContext.connect();
});

afterAll(async () => {
  await dbContext.disconnect();
});
