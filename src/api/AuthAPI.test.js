// src/utils/__tests__/auth.test.js
// import { validateCredentials } from '../auth';
import db from '../data/db.json';
import { validateCredentials } from './AuthAPI';

describe('validateCredentials', () => {
  it('should return token if credentials are correct', () => {
    const result = validateCredentials(db.credentials.username, db.credentials.password);
    expect(result).toBe(db.credentials.token);
  });

  it('should return null if username is incorrect', () => {
    const result = validateCredentials('wrongUser', db.credentials.password);
    expect(result).toBeNull();
  });

  it('should return null if password is incorrect', () => {
    const result = validateCredentials(db.credentials.username, 'wrongPass');
    expect(result).toBeNull();
  });

  it('should return null if both username and password are incorrect', () => {
    const result = validateCredentials('wrongUser', 'wrongPass');
    expect(result).toBeNull();
  });
});
