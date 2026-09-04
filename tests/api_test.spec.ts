import { test, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in/api';

test.describe('Users API — CRUD against reqres.in', () => {
// Valid GET request
test('API GET existing user', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/users/2`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toMatchObject({
        id: 2,
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver',
    });
});
// Invalid GET request
test('API GET non-existent user returns 404', async ({ request }) => {

    const response = await request.get(`${BASE_URL}/users/23`);
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body).toEqual({});

});
// Valid POST request
test('API POST requests', async ({ request }) => {

    const response = await request.post(`${BASE_URL}/users`, {

        data: {
            name: 'Luisa',
            job: 'SDET'
        }
    })

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe('Luisa');
    expect(body.job).toBe('SDET');
    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();

});
// Invalid POST request
test('POST register without password returns 400', async ({ request }) => {
  const response = await request.post(`${BASE_URL}/register`, {
    data: {
      email: 'eve.holt@reqres.in'
    }
  });

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.error).toBe('Missing password');
});
// Valid PUT request
test('PUT update user', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/users/2`, {
        data: {
            name: 'Luisa',
            job: 'Senior SDET'
        }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Luisa');
    expect(body.job).toBe('Senior SDET');
    expect(body.updatedAt).toBeTruthy();
});
// Valid DELETE request
test('DELETE user', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/2`);
    expect(response.status()).toBe(204);
});

});


