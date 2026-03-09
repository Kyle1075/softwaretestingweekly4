import { test, expect } from '@playwright/test';

const BASE_URL = process.env.VITE_FRONTEND_URL || 'http://localhost:5173';

// Test 3
test('retrieve dog image successfully when page is loaded', async ({ page }) => {

  const responsePromise = page.waitForResponse(
    (response) => response.url().includes('/api/dogs/random') && response.status() === 200
  );

  await page.goto(BASE_URL);
  await responsePromise;

  const dogImage = page.locator('img[alt="Random dog"]');


  const src = await dogImage.getAttribute('src');
  expect(src).toBeTruthy();


  expect(src).toMatch(/^https:\/\//);
});

// Test 4
test('retrieve dog image successfully when button is clicked', async ({ page }) => {

  const initialResponse = page.waitForResponse(
    (response) => response.url().includes('/api/dogs/random') && response.status() === 200
  );

  await page.goto(BASE_URL);
  await initialResponse;


  const responsePromise = page.waitForResponse(
    (response) => response.url().includes('/api/dogs/random') && response.status() === 200
  );

  await page.getByRole('button', { name: /get another dog/i }).click();
  await responsePromise;

  const dogImage = page.locator('img[alt="Random dog"]');


  const src = await dogImage.getAttribute('src');
  expect(src).toBeTruthy();


  expect(src).toMatch(/^https:\/\//);
});

// Test 5
test('display error correctly when API call fails', async ({ page }) => {

  await page.route('**/api/dogs/random', (route) => route.abort());

  await page.goto(BASE_URL);


  const errorElement = page.locator(':text-matches("error", "i")').first();

  await expect(errorElement).toBeVisible();
});