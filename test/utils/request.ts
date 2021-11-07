import supertestRequest from 'supertest';
import getServer from '../../src/API/server';

export const request = () => {
  return supertestRequest(getServer());
};
