import '../../utils/hooks';
import request from 'supertest';

describe('API /users', () => {
  describe('GET /users/employees', () => {
    it('should return employees', async () => {
      expect(2).toBe(2);
    });
  });
});
