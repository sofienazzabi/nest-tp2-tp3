import { AuthentificationMiddleware } from './authentication.middleware';

describe('AuthentificationMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthentificationMiddleware()).toBeDefined();
  });
});