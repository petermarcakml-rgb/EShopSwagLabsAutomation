import { expect, test, BrowserContext, Page } from '@playwright/test'
import config from '../../config/config.json'
import { messages } from '../../config/constants.ts'
import { pageObjectLogin } from '../../pageObjects/ui/login.ts'
import { pageObjectCommon } from '../../pageObjects/ui/common.ts'

test.describe('E-Shop Swag Labs', () => {
    let context: BrowserContext
    let page: Page
    let poLogin: pageObjectLogin
    let poCommon: pageObjectCommon

    const standardUser = config.users.standardUser.username
    const standardUserPassword = config.users.standardUser.password
    const notExestingUser = config.users.notExestingUser.username
    const lockedOutUser = config.users.lockedOutUser.username
    const lockedOutUserPassword = config.users.lockedOutUser.password
    const notExestingUserPassword = config.users.notExestingUser.password

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()

        poLogin = new pageObjectLogin(page)
        poCommon = new pageObjectCommon(page)

        await test.step('1. Open Login Page', async () => {
            await poLogin.openLoginPage()
        })
    })

    test.afterAll(async () => {
        await page.close() // Closing the page to free up resources
        await context.close() // Closing the context to free up resources
    })

    test.describe('Login, Logout', async () => {
        test.describe('Check Login', async () => {
            test('Check Login with empty/wrong credentials, locked out user and valid user', async () => {
                test.setTimeout(30000) // setting test timeout for 30 seconds

                /*
                Why it matters: Validates the gateway to the user's personalized zone and is critical for security.
                A broken login immediately blocks loyal customers from making purchases and managing their accounts.
                */

                await test.step('1. Fill Username', async () => {
                    await poLogin.fillName(standardUser)
                })

                await test.step('2. Fill Empty Password', async () => {
                    await poLogin.fillPassword('')
                })

                await test.step('3. Click on Login button', async () => {
                    await poLogin.clickOnLoginButton()
                })

                await test.step('4. The text of login error message is correct', async () => {
                    const element = poCommon.errorMessage
                    await expect(element).toHaveText(messages.loginErrorMessagePassword)
                })

                await test.step('5. Close the error message', async () => {
                    await poCommon.closeErrorMessage()
                })

                await test.step('6. Fill Empty Username', async () => {
                    await poLogin.fillName('')
                })

                await test.step('7. Fill Password', async () => {
                    await poLogin.fillPassword(standardUserPassword)
                })

                await test.step('8. Click on Login button', async () => {
                    await poLogin.clickOnLoginButton()
                })

                await test.step('9. The text of login error message is correct', async () => {
                    const element = poCommon.errorMessage
                    await expect(element).toHaveText(messages.loginErrorMessageUsername)
                })

                await test.step('10. Close the error message', async () => {
                    await poCommon.closeErrorMessage()
                })

                await test.step('11. Fill Username', async () => {
                    await poLogin.fillName(standardUser)
                })

                await test.step('12. Fill Wrong Password', async () => {
                    await poLogin.fillPassword(notExestingUserPassword)
                })

                await test.step('13. Click on Login button', async () => {
                    await poLogin.clickOnLoginButton()
                })

                await test.step('14. The text of login error message is correct', async () => {
                    const element = poCommon.errorMessage
                    await expect(element).toHaveText(messages.loginErrorMessageCredentials)
                })

                await test.step('15. Close the error message', async () => {
                    await poCommon.closeErrorMessage()
                })

                await test.step('16. Fill Wrong Username', async () => {
                    await poLogin.fillName(notExestingUser)
                })

                await test.step('17. Fill Password', async () => {
                    await poLogin.fillPassword(standardUserPassword)
                })

                await test.step('18. Click on Login button', async () => {
                    await poLogin.clickOnLoginButton()
                })

                await test.step('19. The text of login error message is correct', async () => {
                    const element = poCommon.errorMessage
                    await expect(element).toHaveText(messages.loginErrorMessageCredentials)
                })

                await test.step('20. Close the error message', async () => {
                    await poCommon.closeErrorMessage()
                })

                await test.step('21. Fill Wrong Username', async () => {
                    await poLogin.fillName(notExestingUser)
                })

                await test.step('22. Fill Wrong Password', async () => {
                    await poLogin.fillPassword(notExestingUserPassword)
                })

                await test.step('23. Click on Login button', async () => {
                    await poLogin.clickOnLoginButton()
                })

                await test.step('24. The text of login error message is correct', async () => {
                    const element = poCommon.errorMessage
                    await expect(element).toHaveText(messages.loginErrorMessageCredentials)
                })

                await test.step('25. Close the error message', async () => {
                    await poCommon.closeErrorMessage()
                })

                await test.step('26. Fill Locked Out user', async () => {
                    await poLogin.fillName(lockedOutUser)
                })

                await test.step('27. Fill Locked Out User Password', async () => {
                    await poLogin.fillPassword(lockedOutUserPassword)
                })

                await test.step('28. Click on Login button', async () => {
                    await poLogin.clickOnLoginButton()
                })

                await test.step('29. The text of login error message is correct', async () => {
                    const element = poCommon.errorMessage
                    await expect(element).toHaveText(messages.loginErrorMessageLockedOut)
                })

                await test.step('30. Close the error message', async () => {
                    await poCommon.closeErrorMessage()
                })

                await test.step('31. Fill Username', async () => {
                    await poLogin.fillName(standardUser)
                })

                await test.step('32. Fill Password', async () => {
                    await poLogin.fillPassword(standardUserPassword)
                })

                await test.step('33. Click on Login button', async () => {
                    await poLogin.clickOnLoginButton()
                })

                await test.step('34. User is logged in successfully and the inventory item is displayed', async () => {
                    const element = poCommon.inventoryItem.first()
                    await expect(element).toBeVisible()
                })

                await test.step('35. Logout user', async () => {
                    await poCommon.logoutUser()
                })
            })
        })
    })
})
