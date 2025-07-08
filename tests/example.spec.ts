import { test } from "@playwright/test"

//Visit Home Page (Act)
test.only ("Sucessful Login", async ({ page }) => {
    await page.goto ("https://www.saucedemo.com/")
})

//Sucessful Login 
test ("Login with valid credentials", async ({ page }) => {
    await page.goto ("https://www.saucedemo.com/")
    await page.fill("#user-name", "standard_user")
    await page.fill("#password", "secret_sauce")
    await page.click("#login-button")
    await page.waitForURL("https://www.saucedemo.com/inventory.html")
    await page.screenshot({ path: "screenshot.png" })
    await page.close() 

})

//Unsucessful Login 
test ("Failed login with invalid credentials", async ({ page }) => {
    await page.goto ("https://www.saucedemo.com/")
    await page.fill("#user-name", "standard_user")
    await page.fill("#password", "wrong_password")
    await page.click("#login-button")
    await page.waitForSelector(".error-message-container.error")
    const errorMessage = await page.textContent(".error-message-container.error")
    console.log("Error message:", errorMessage)
    await page.screenshot({ path: "error_screenshot.png" })
    await page.close()

})
