import { expect, test, describe, beforeAll, afterAll } from 'bun:test';
import { db, eq, Users, Companies } from 'pertentodb';
import { signin, mockUser } from '../auth-server/helpers';
import { testUsers } from './users';
import { testEditorData } from './editor-data';
import { testCompanies } from './companies';
import { testDeviceTargeting } from './device-targeting';
import { testUrlTargeting } from './url-targeting';
import { testVariants } from './variants';
import { testWebsites } from './websites';
import { testExperiments } from './experiments';
const { VITE_API_URL: API_URL, SUPER_USER, SUPER_PASSWORD } = process.env;

describe('API Server', () => {
  const headers = {
    Authorization: ``,
    'Content-Type': 'application/json',
  };

  beforeAll(async () => {
    const response = await signin({ email: SUPER_USER, password: SUPER_PASSWORD });
    headers.Authorization = `Bearer ${response.token}`;
  });

  describe(`it's alive`, () => {
    test('should return 200', async () => {
      const response = await fetch(API_URL);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.pertentoAPIServer).toBeTruthy();
    });
  });

  describe('/users', () => {
    testUsers(headers);
  });

  describe('/editor-data', () => {
    testEditorData(headers);
  });

  describe('/companies', () => {
    testCompanies(headers);
  });

  describe('/device-targeting', () => {
    testDeviceTargeting(headers);
  });

  describe('/url-targeting', () => {
    testUrlTargeting(headers);
  });

  describe('/variants', () => {
    testVariants(headers);
  });

  describe('/websites', () => {
    testWebsites(headers);
  });

  describe('/experiments', () => {
    testExperiments(headers);
  });
});
