import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
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
  await expect(page.locator("text=Signed In Successfully!")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  // Fill hotel details
  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is a description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Budget").click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  // Upload images
  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.png"),
    path.join(__dirname, "files", "2.png"),
  ]);

  // Click Save button
  await page.getByRole("button", { name: "Save" }).click();

  // Wait for the "Hotel Saved" text to appear
  await expect(page.locator("text=Hotel Saved")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("Dublin Getaways")).toBeVisible();
  await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
  await expect(page.getByText("Dublin,Ireland")).toBeVisible();
  await expect(page.getByText("All Inclusive")).toBeVisible();
  await expect(page.getByText("$119 per night")).toBeVisible();
  await expect(page.getByText("2 adults,3 children")).toBeVisible();
  await expect(page.getByText("2 Star Rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});
