import { expect, test, describe, beforeAll, afterAll } from 'bun:test';
import { mockCompany } from './helpers';
const { VITE_API_URL: API_URL, SUPER_USER } = process.env;

export const testCompanies = (headers) => {
  let newCompanyId = null;
  test('GET /companies/clients', async () => {
    const response = await fetch(`${API_URL}/companies/1/clients`, { headers });
    expect(response.status).toBe(200);
    const clients = await response.json();
    expect(clients).toBeInstanceOf(Array);
    expect(clients.length).toBeGreaterThan(0);
  });

  test('POST /companies', async () => {
    const response = await fetch(`${API_URL}/companies`, {
      method: 'POST',
      headers,
      body: JSON.stringify(mockCompany),
    });
    expect(response.status).toBe(200);
    const company = await response.json();
    expect(company.id).toBeGreaterThan(0);
    expect(company.name).toBe(mockCompany.name);
    expect(company.friendlyName).toBe(mockCompany.name);
    newCompanyId = company.id;
  });

  test('PUT /companies/:companyId', async () => {
    const response = await fetch(`${API_URL}/companies/${newCompanyId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ friendlyName: 'New Company Name' }),
    });
    expect(response.status).toBe(200);
    const company = await response.json();
    expect(company.id).toBe(newCompanyId);
    expect(company.friendlyName).toBe('New Company Name');
  });

  test('DELETE /companies/:companyId', async () => {
    const response = await fetch(`${API_URL}/companies/${newCompanyId}`, {
      method: 'DELETE',
      headers,
    });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
  });
};
