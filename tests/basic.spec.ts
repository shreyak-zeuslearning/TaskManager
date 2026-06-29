import { test, Page, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://192.168.17.132:5500/");
});

test('add task', async({page})=>{
    await page.locator('#taskInput').fill('Playwright');
    await page.locator('#taskInput').fill('Typescript');
    await page.locator('#taskInput').fill('Cucumber');
    await page.locator('#addButton').click();

});

test('delete task', async({page})=>{
    await page.locator('#taskInput').fill('Playwright');
    await page.locator('#addButton').click();
    page.once('dialog', async(dialog)=>{
        expect(dialog.type()).toBe('confirm');
        await dialog.accept();
    });

    await page.locator('#deleteButton').click();
    await expect(page.getByText('Playwright')).toHaveCount(0);

});

test('mark as complete and not complete ', async({page})=>{
   await page.locator('#taskInput').fill('Playwright');

    await page.locator('#addButton').click();

    const checkbox= page.locator('#checkbox');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
});

test("clear all tasks", async ({ page }) => {
  await page.locator("#taskInput").fill("Playwright");
  await page.locator("#taskInput").fill("Typescript");
  await page.locator("#taskInput").fill("Cucumber");
  await page.locator("#addButton").click();

  page.once("dialog", async (dialog) => {
    expect(dialog.type()).toBe("confirm");
    await dialog.accept();
  });
  await page.locator("#clearButton").click();

await expect (page.locator('#taskItem')).toHaveCount(0);
});
