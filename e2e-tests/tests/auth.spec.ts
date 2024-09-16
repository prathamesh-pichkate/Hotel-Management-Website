import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  // Get the sign in button
  await page.getByRole("link", { name: "Signin" }).click();

  // Ensure the Sign In heading is visible
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // Corrected the syntax for input locators
  await page.locator("[name=email]").fill("q@gmail.com");
  await page.locator("[name=password]").fill("151743");

  // Click the Login button
  await page.getByRole("button", { name: "Login" }).click();

  // Verify success messages and post-login links are visible
  await expect(page.getByText("Signed In Successfully!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Signout" })).toBeVisible();
});

test("should allow the user to register", async ({ page }) => {
  const testEmail = `test_${
    Math.floor(Math.random() * 90000) + 10000
  }@mail.com`;
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Signin" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("151743");
  await page.locator("[name=confirmPassword]").fill("151743");

  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(page.getByText("Registered Successfully!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Signout" })).toBeVisible();
});
