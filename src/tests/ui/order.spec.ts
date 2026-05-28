import { expect, test, Page } from '@playwright/test'
import config from '../../config/config.json'
import { messages, inventoryItems, checkoutOverviewLabels } from '../../config/constants.ts'
import { pageObjectCommon, locatorCommon } from '../../pageObjects/ui/common.ts'
import { pageObjectLogin } from '../../pageObjects/ui/login.ts'
import { pageObjectHomePage, inventorySelectedItemInterface, clickShoppingCartLink } from '../../pageObjects/ui/homePage.ts'
import { pageObjectCart, clickCheckout } from '../../pageObjects/ui/cart.ts'
import { pageObjectCheckoutYourInformation, fillCheckoutInformation, clickContinueInCheckoutYourInformation } from '../../pageObjects/ui/checkoutYourInformation.ts'
import { pageObjectCheckoutOverview, locatorCheckoutOverview, clickFinishInCheckoutOverview } from '../../pageObjects/ui/checkoutOverview.ts'
import { pageObjectCheckoutComplete, locatorCheckoutComplete, clickBackHomeInCheckoutComplete } from '../../pageObjects/ui/checkoutComplete.ts'

test.describe('E-Shop Swag Labs', () => {
    let poCommon: pageObjectCommon
    let poLogin: pageObjectLogin
    let poHomePage: pageObjectHomePage
    let poCart: pageObjectCart
    let poCheckoutYourInformation: pageObjectCheckoutYourInformation
    let poCheckoutOverview: pageObjectCheckoutOverview
    let poCheckoutComplete: pageObjectCheckoutComplete

    const standardUser = config.users.standardUser.username
    const standardUserPassword = config.users.standardUser.password
    const mainHomePageUrl = config.mainHomePageUrl

    const firstName = 'TestFirstName'
    const lastName = 'TestLastName'
    const postalCode = '12345'

    test.beforeEach(async ({ page }) => {
        poCommon = new pageObjectCommon(page)
        poLogin = new pageObjectLogin(page)
        poHomePage = new pageObjectHomePage(page)
        poCart = new pageObjectCart(page)
        poCheckoutYourInformation = new pageObjectCheckoutYourInformation(page)
        poCheckoutOverview = new pageObjectCheckoutOverview(page)
        poCheckoutComplete = new pageObjectCheckoutComplete(page)

        await test.step('1. Open Login Page', async () => {
            await poLogin.openLoginPage()
        })

        await test.step('2. Login with standard user', async () => {
            await poLogin.loginUser(standardUser, standardUserPassword)
        })
    })

    test.describe('Ordering', async () => {
        test.describe('Happy Path Order', async () => {
            const itemsToSelect = 3

            test('Order with ' + itemsToSelect + ' Random Inventory Items', async () => {
                test.setTimeout(30000) // setting test timeout for 30 seconds

                /*
                Why it matters: Tests the core revenue-generating flow (the money-making path).
                It ensures that a customer can smoothly navigate from product selection to a successful checkout without any friction.
                */

                let selectedItems: inventorySelectedItemInterface

                await test.step('1. Select ' + itemsToSelect + ' Random Inventory Items', async () => {
                    const [names, descriptions, priceStringValues, prices] = await poHomePage.selectRandomInventoryItems(itemsToSelect)

                    selectedItems = {
                        selectedNameItems: names as string[],
                        selectedDescriptionItems: descriptions as string[],
                        selectedPriceStringValueItems: priceStringValues as string[],
                        selectedPriceItems: prices as number[]
                    }
                })

                await test.step('2. Click Shopping Cart Link', async () => {
                    await poHomePage.clickShoppingCartLink()
                })

                await test.step('3. Selected Name Items are correct', async () => {
                    for (let i = 0; i < itemsToSelect; i++) {
                        const text = await poCommon.generalInventoryItemName.nth(i).textContent()
                        expect(selectedItems.selectedNameItems[i]).toContain(text)
                    }
                })

                await test.step('4. Selected Description of Items are correct', async () => {
                    for (let i = 0; i < itemsToSelect; i++) {
                        const text = await poCommon.generalInventoryItemDescription.nth(i).textContent()
                        expect(selectedItems.selectedDescriptionItems[i]).toContain(text)
                    }
                })

                await test.step('5. Selected Price String Values of Items are correct', async () => {
                    for (let i = 0; i < itemsToSelect; i++) {
                        const text = await poCommon.generalInventoryItemPrice.nth(i).textContent()
                        expect(selectedItems.selectedPriceStringValueItems[i]).toContain(text)
                    }
                })

                await test.step('6. Click Checkout button', async () => {
                    await poCart.clickCheckout()
                })

                await test.step('7. Fill Your Information', async () => {
                    await poCheckoutYourInformation.fillCheckoutInformation(firstName, lastName, postalCode)
                })

                await test.step('8. Click Continue button', async () => {
                    await poCheckoutYourInformation.clickContinue()
                })

                await test.step('9. Selected Name Items are correct', async () => {
                    for (let i = 0; i < itemsToSelect; i++) {
                        const text = await poCommon.generalInventoryItemName.nth(i).textContent()
                        expect(selectedItems.selectedNameItems[i]).toContain(text)
                    }
                })

                await test.step('10. Selected Description of Items are correct', async () => {
                    for (let i = 0; i < itemsToSelect; i++) {
                        const text = await poCommon.generalInventoryItemDescription.nth(i).textContent()
                        expect(selectedItems.selectedDescriptionItems[i]).toContain(text)
                    }
                })

                await test.step('11. Selected Price String Values of Items are correct', async () => {
                    for (let i = 0; i < itemsToSelect; i++) {
                        const text = await poCommon.generalInventoryItemPrice.nth(i).textContent()
                        expect(selectedItems.selectedPriceStringValueItems[i]).toContain(text)
                    }
                })

                await test.step('12. The Payment Information label is correct', async () => {
                    const element = poCheckoutOverview.paymentInfoLabel
                    await expect(element).toHaveText(checkoutOverviewLabels.paymentInformation)
                })

                await test.step('13. The Payment Information value is not empty value', async () => {
                    const element = poCheckoutOverview.paymentInfoValue
                    await expect(element).not.toHaveText('')
                })

                await test.step('14. The Shipping Information label is correct', async () => {
                    const element = poCheckoutOverview.shippingInfoLabel
                    await expect(element).toHaveText(checkoutOverviewLabels.shippingInformation)
                })

                await test.step('15. The Shipping Information value is not empty value', async () => {
                    const element = poCheckoutOverview.shippingInfoValue
                    await expect(element).not.toHaveText('')
                })

                await test.step('16. The Price Total label is correct', async () => {
                    const element = poCheckoutOverview.totalInfoLabel
                    await expect(element).toHaveText(checkoutOverviewLabels.priceTotalInformation)
                })

                await test.step('17. The Item total value is correct', async () => {
                    let itemsTotal: number = 0

                    for (let i = 0; i < itemsToSelect; i++) {
                        itemsTotal += selectedItems.selectedPriceItems[i]
                    }

                    const element = poCheckoutOverview.subtotalLabel
                    await expect(element).toHaveText(checkoutOverviewLabels.itemTotal + itemsTotal.toString())
                })

                await test.step('18. The Tax is displayed', async () => {
                    const element = poCheckoutOverview.taxLabel
                    await expect(element).toContainText(checkoutOverviewLabels.tax)
                })

                await test.step('19. The Total is displayed', async () => {
                    const element = poCheckoutOverview.totalLabel
                    await expect(element).toContainText(checkoutOverviewLabels.total)
                })

                await test.step('20. Click Finish button', async () => {
                    await poCheckoutOverview.clickFinish()
                })

                await test.step('21. The order completion message is correct', async () => {
                    const element = poCheckoutComplete.completeHeader
                    await expect(element).toHaveText(messages.completeOrderHeader)
                })

                await test.step('22. The order completion text is correct', async () => {
                    const element = poCheckoutComplete.completeText
                    await expect(element).toHaveText(messages.completeOrderText)
                })

                await test.step('23. The Back Home button is displayed', async () => {
                    const element = poCheckoutComplete.btnBackHome
                    await expect(element).toBeVisible()
                })

                await test.step('24. Click Back Home button', async () => {
                    await poCheckoutComplete.clickBackHome()
                })

                await test.step('23. The first Inventory Item is displayed', async () => {
                    const element = poCommon.inventoryItem.first()
                    await expect(element).toBeVisible()
                })
            })
        })

        test.describe('Chaotic order', async () => {
            test('Ordering with hesitant shopper', async () => {
                test.setTimeout(30000)

                /*
                Why it matters: Simulates real-world behavior of hesitant shoppers and validates dynamic cart management.
                It tests the accurate recalculation of prices, subtotals, and inventory updates in the background during continuous updates.
                */

                await test.step('1. Click add to Cart Sauce Labs Backpack', async () => {
                    await poHomePage.clickAddToCartSauceLabsBackpack()
                })

                await test.step('2. Click add to Cart Sauce Labs BikeLight', async () => {
                    await poHomePage.clickAddToCartSauceLabsBikeLight()
                })

                await test.step('3. Click add to Cart Sauce Labs Bolt TShirt', async () => {
                    await poHomePage.clickAddToCartSauceLabsBoltTShirt()
                })

                await test.step('4. Click add to Cart Sauce Labs FleeceJacket', async () => {
                    await poHomePage.clickAddToCartSauceLabsFleeceJacket()
                })

                await test.step('5. Click Shopping Cart Link', async () => {
                    await poHomePage.clickShoppingCartLink()
                })

                await test.step('6. Click remove from Cart Sauce Labs BikeLight', async () => {
                    await poCommon.clickRemoveFromCartSauceLabsBikeLight()
                })

                await test.step('7. Click remove from Cart Sauce Labs Bolt TShirt', async () => {
                    await poCommon.clickRemoveFromCartSauceLabsBoltTShirt()
                })

                await test.step('8. Click Continue Shopping button', async () => {
                    await poCart.clickContinueShopping()
                })

                await test.step('9. Click add to Cart Sauce Labs Onesie', async () => {
                    await poHomePage.clickAddToCartSauceLabsOnesie()
                })

                await test.step('10. Click Shopping Cart Link', async () => {
                    await poHomePage.clickShoppingCartLink()
                })

                await test.step('11. Click remove from Cart Sauce Labs Backpack', async () => {
                    await poCommon.clickRemoveFromCartSauceLabsBackpack()
                })

                await test.step('12. Selected Name Items are correct', async () => {
                    const items: string[] = []

                    const numberOfSelectedItems = await poCommon.generalInventoryItemName.count()

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await poCommon.generalInventoryItemName.nth(i).textContent()
                        items.push(text?.trim() || '')
                    }

                    expect(items).toContain(inventoryItems.sauceLabsFleeceJacketName)
                    expect(items).toContain(inventoryItems.sauceLabsOnesieName)
                })

                await test.step('13. Selected Description of Items are correct', async () => {
                    const descriptions: string[] = []

                    const numberOfSelectedItems = await poCommon.generalInventoryItemName.count()

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await poCommon.generalInventoryItemDescription.nth(i).textContent()
                        descriptions.push(text?.trim() || '')
                    }

                    expect(descriptions).toContain(inventoryItems.sauceLabsFleeceJacketDescription)
                    expect(descriptions).toContain(inventoryItems.sauceLabsOnesieDescription)
                })

                await test.step('14. Selected Price String Values of Items are correct', async () => {
                    const prices: string[] = []

                    const numberOfSelectedItems = await poCommon.generalInventoryItemName.count()

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await poCommon.generalInventoryItemPrice.nth(i).textContent()
                        prices.push(text?.trim() || '')
                    }

                    expect(prices).toContain(inventoryItems.sauceLabsFleeceJacketPriceStringValue)
                    expect(prices).toContain(inventoryItems.sauceLabsOnesiePriceStringValue)
                })

                await test.step('15. Click Checkout button', async () => {
                    await poCart.clickCheckout()
                })

                await test.step('16. Fill Your Information', async () => {
                    await poCheckoutYourInformation.fillCheckoutInformation(firstName, lastName, postalCode)
                })

                await test.step('17. Click Continue button', async () => {
                    await poCheckoutYourInformation.clickContinue()
                })

                await test.step('18. Selected Name Items are correct', async () => {
                    const items: string[] = []

                    const numberOfSelectedItems = await poCommon.generalInventoryItemName.count()

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await poCommon.generalInventoryItemName.nth(i).textContent()
                        items.push(text?.trim() || '')
                    }

                    expect(items).toContain(inventoryItems.sauceLabsFleeceJacketName)
                    expect(items).toContain(inventoryItems.sauceLabsOnesieName)
                })

                await test.step('19. Selected Description of Items are correct', async () => {
                    const descriptions: string[] = []

                    const numberOfSelectedItems = await poCommon.generalInventoryItemName.count()

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await poCommon.generalInventoryItemDescription.nth(i).textContent()
                        descriptions.push(text?.trim() || '')
                    }

                    expect(descriptions).toContain(inventoryItems.sauceLabsFleeceJacketDescription)
                    expect(descriptions).toContain(inventoryItems.sauceLabsOnesieDescription)
                })

                await test.step('20. Selected Price String Values of Items are correct', async () => {
                    const prices: string[] = []

                    const numberOfSelectedItems = await poCommon.generalInventoryItemName.count()

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await poCommon.generalInventoryItemPrice.nth(i).textContent()
                        prices.push(text?.trim() || '')
                    }

                    expect(prices).toContain(inventoryItems.sauceLabsFleeceJacketPriceStringValue)
                    expect(prices).toContain(inventoryItems.sauceLabsOnesiePriceStringValue)
                })

                await test.step('21. The Payment Information label is correct', async () => {
                    const element = poCheckoutOverview.paymentInfoLabel
                    await expect(element).toHaveText(checkoutOverviewLabels.paymentInformation)
                })

                await test.step('22. The Payment Information value is not empty value', async () => {
                    const element = poCheckoutOverview.paymentInfoValue
                    await expect(element).not.toHaveText('')
                })

                await test.step('23. The Shipping Information label is correct', async () => {
                    const element = poCheckoutOverview.shippingInfoLabel
                    await expect(element).toHaveText(checkoutOverviewLabels.shippingInformation)
                })

                await test.step('24. The Shipping Information value is not empty value', async () => {
                    const element = poCheckoutOverview.shippingInfoValue
                    await expect(element).not.toHaveText('')
                })

                await test.step('25. The Price Total label is correct', async () => {
                    const element = poCheckoutOverview.totalInfoLabel
                    await expect(element).toHaveText(checkoutOverviewLabels.priceTotalInformation)
                })

                await test.step('26. The Item total value is correct', async () => {
                    const itemsTotal = inventoryItems.sauceLabsFleeceJacketPrice + inventoryItems.sauceLabsOnesiePrice

                    const element = poCheckoutOverview.subtotalLabel
                    await expect(element).toHaveText(checkoutOverviewLabels.itemTotal + itemsTotal.toString())
                })

                await test.step('27. The Tax is displayed', async () => {
                    const element = poCheckoutOverview.taxLabel
                    await expect(element).toContainText(checkoutOverviewLabels.tax)
                })

                await test.step('28. The Total is displayed', async () => {
                    const element = poCheckoutOverview.totalLabel
                    await expect(element).toContainText(checkoutOverviewLabels.total)
                })

                await test.step('29. Click Finish button', async () => {
                    await poCheckoutOverview.clickFinish()
                })

                await test.step('30. The order completion message is correct', async () => {
                    const element = poCheckoutComplete.completeHeader
                    await expect(element).toHaveText(messages.completeOrderHeader)
                })

                await test.step('31. The order completion text is correct', async () => {
                    const element = poCheckoutComplete.completeText
                    await expect(element).toHaveText(messages.completeOrderText)
                })

                await test.step('32. The Back Home button is displayed', async () => {
                    const element = poCheckoutComplete.btnBackHome
                    await expect(element).toBeVisible()
                })

                await test.step('33. Click Back Home button', async () => {
                    await poCheckoutComplete.clickBackHome()
                })

                await test.step('34. The first Inventory Item is displayed', async () => {
                    const element = poCommon.inventoryItem.first()
                    await expect(element).toBeVisible()
                })
            })
        })

        test.describe('Cart persistence (Multi-tab & Session restore)', async () => {
            test('Ordering with checking cache - new tab, close-open browser and login-logout', async ({context, page}) => {
                test.setTimeout(30000)

                /*
                Why it matters: Verifies the robustness of data storage (Cookies/LocalStorage) and the continuity of the user experience.
                Customers frequently compare items across multiple tabs or return to complete their purchase later after closing the browser.
                */

                let numberOfSelectedItems: number

                let tab2: Page
                let newBrowser: Page

                await test.step('1. Click add to Cart Sauce Labs Backpack', async () => {
                    await poHomePage.clickAddToCartSauceLabsBackpack()
                })

                await test.step('2. Click add to Cart Sauce Labs Bolt TShirt', async () => {
                    await poHomePage.clickAddToCartSauceLabsBoltTShirt()
                })

                await test.step('3. Click add to Cart Sauce Labs Onesie', async () => {
                    await poHomePage.clickAddToCartSauceLabsOnesie()
                })

                await test.step('4. Click Shopping Cart Link', async () => {
                    await poHomePage.clickShoppingCartLink()
                })

                await test.step('5. Get number of selected items', async () => {
                    numberOfSelectedItems = await poCommon.generalInventoryItemName.count()
                })

                await test.step('6. Selected Name Items are correct', async () => {
                    const items: string[] = []

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await poCommon.generalInventoryItemName.nth(i).textContent()
                        items.push(text?.trim() || '')
                    }

                    expect(items).toContain(inventoryItems.sauceLabsBackpackName)
                    expect(items).toContain(inventoryItems.sauceLabsBoltTShirtName)
                    expect(items).toContain(inventoryItems.sauceLabsOnesieName)
                })

                await test.step('7. Selected Description of Items are correct', async () => {
                    const descriptions: string[] = []

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await poCommon.generalInventoryItemDescription.nth(i).textContent()
                        descriptions.push(text?.trim() || '')
                    }

                    expect(descriptions).toContain(inventoryItems.sauceLabsBackpackDescription)
                    expect(descriptions).toContain(inventoryItems.sauceLabsBoltTShirtDescription)
                    expect(descriptions).toContain(inventoryItems.sauceLabsOnesieDescription)
                })

                await test.step('8. Selected Price String Values of Items are correct', async () => {
                    const prices: string[] = []

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await poCommon.generalInventoryItemPrice.nth(i).textContent()
                        prices.push(text?.trim() || '')
                    }

                    expect(prices).toContain(inventoryItems.sauceLabsBackpackPriceStringValue)
                    expect(prices).toContain(inventoryItems.sauceLabsBoltTShirtPriceStringValue)
                    expect(prices).toContain(inventoryItems.sauceLabsOnesiePriceStringValue)
                })

                await test.step('9. Open New Tab', async () => {
                    tab2 = await context.newPage()
                    await tab2.bringToFront()
                })

                await test.step('10. Navigate to Main Home Page Url in New Tab', async () => {
                    await tab2.goto(mainHomePageUrl)
                })

                await test.step('11. Click Shopping Cart Link in New Tab', async () => {
                    await clickShoppingCartLink(tab2)
                })

                await test.step('12. Selected Name Items are correct', async () => {
                    const items: string[] = []

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await tab2.locator(locatorCommon.generalInventoryItemName).nth(i).textContent()
                        items.push(text?.trim() || '')
                    }

                    expect(items).toContain(inventoryItems.sauceLabsBackpackName)
                    expect(items).toContain(inventoryItems.sauceLabsBoltTShirtName)
                    expect(items).toContain(inventoryItems.sauceLabsOnesieName)
                })

                await test.step('13. Selected Description of Items are correct', async () => {
                    const descriptions: string[] = []

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await tab2.locator(locatorCommon.generalInventoryItemDescription).nth(i).textContent()
                        descriptions.push(text?.trim() || '')
                    }

                    expect(descriptions).toContain(inventoryItems.sauceLabsBackpackDescription)
                    expect(descriptions).toContain(inventoryItems.sauceLabsBoltTShirtDescription)
                    expect(descriptions).toContain(inventoryItems.sauceLabsOnesieDescription)
                })

                await test.step('14. Selected Price String Values of Items are correct', async () => {
                    const prices: string[] = []

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await tab2.locator(locatorCommon.generalInventoryItemPrice).nth(i).textContent()
                        prices.push(text?.trim() || '')
                    }

                    expect(prices).toContain(inventoryItems.sauceLabsBackpackPriceStringValue)
                    expect(prices).toContain(inventoryItems.sauceLabsBoltTShirtPriceStringValue)
                    expect(prices).toContain(inventoryItems.sauceLabsOnesiePriceStringValue)
                })

                await test.step('15. Close all Tabs', async () => {
                    await page.close()
                    await tab2.close()
                })

                await test.step('16. Open New Browser', async () => {
                    newBrowser = await context.newPage()
                    await newBrowser.bringToFront()
                })

                await test.step('17. Navigate to Main Home Page Url in New Tab', async () => {
                    await newBrowser.goto(mainHomePageUrl)
                })

                await test.step('18. Click Shopping Cart Link in New Tab', async () => {
                    await clickShoppingCartLink(newBrowser)
                })

                await test.step('19. Selected Name Items are correct', async () => {
                    const items: string[] = []

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await newBrowser.locator(locatorCommon.generalInventoryItemName).nth(i).textContent()
                        items.push(text?.trim() || '')
                    }

                    expect(items).toContain(inventoryItems.sauceLabsBackpackName)
                    expect(items).toContain(inventoryItems.sauceLabsBoltTShirtName)
                    expect(items).toContain(inventoryItems.sauceLabsOnesieName)
                })

                await test.step('20. Selected Description of Items are correct', async () => {
                    const descriptions: string[] = []

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await newBrowser.locator(locatorCommon.generalInventoryItemDescription).nth(i).textContent()
                        descriptions.push(text?.trim() || '')
                    }

                    expect(descriptions).toContain(inventoryItems.sauceLabsBackpackDescription)
                    expect(descriptions).toContain(inventoryItems.sauceLabsBoltTShirtDescription)
                    expect(descriptions).toContain(inventoryItems.sauceLabsOnesieDescription)
                })

                await test.step('21. Selected Price String Values of Items are correct', async () => {
                    const prices: string[] = []

                    for (let i = 0; i < numberOfSelectedItems; i++) {
                        const text = await newBrowser.locator(locatorCommon.generalInventoryItemPrice).nth(i).textContent()
                        prices.push(text?.trim() || '')
                    }

                    expect(prices).toContain(inventoryItems.sauceLabsBackpackPriceStringValue)
                    expect(prices).toContain(inventoryItems.sauceLabsBoltTShirtPriceStringValue)
                    expect(prices).toContain(inventoryItems.sauceLabsOnesiePriceStringValue)
                })

                await test.step('22. Click Checkout button', async () => {
                    await clickCheckout(newBrowser)
                })

                await test.step('23. Fill Your Information', async () => {
                    await fillCheckoutInformation(newBrowser, firstName, lastName, postalCode)
                })

                await test.step('24. Click Continue button', async () => {
                    await clickContinueInCheckoutYourInformation(newBrowser)
                })

                await test.step('25. The Payment Information label is correct', async () => {
                    const element = newBrowser.locator(locatorCheckoutOverview.paymentInfoLabel)
                    await expect(element).toHaveText(checkoutOverviewLabels.paymentInformation)
                })

                await test.step('26. The Payment Information value is not empty value', async () => {
                    const element = newBrowser.locator(locatorCheckoutOverview.paymentInfoValue)
                    await expect(element).not.toHaveText('')
                })

                await test.step('27. The Shipping Information label is correct', async () => {
                    const element = newBrowser.locator(locatorCheckoutOverview.shippingInfoLabel)
                    await expect(element).toHaveText(checkoutOverviewLabels.shippingInformation)
                })

                await test.step('28. The Shipping Information value is not empty value', async () => {
                    const element = newBrowser.locator(locatorCheckoutOverview.shippingInfoValue)
                    await expect(element).not.toHaveText('')
                })

                await test.step('29. The Price Total label is correct', async () => {
                    const element = newBrowser.locator(locatorCheckoutOverview.totalInfoLabel)
                    await expect(element).toHaveText(checkoutOverviewLabels.priceTotalInformation)
                })

                await test.step('30. The Item total value is correct', async () => {
                    const itemsTotal = inventoryItems.sauceLabsBackpackPrice + inventoryItems.sauceLabsBoltTShirtPrice + inventoryItems.sauceLabsOnesiePrice

                    const element = newBrowser.locator(locatorCheckoutOverview.subtotalLabel)
                    await expect(element).toHaveText(checkoutOverviewLabels.itemTotal + itemsTotal.toString())
                })

                await test.step('31. The Tax is displayed', async () => {
                    const element = newBrowser.locator(locatorCheckoutOverview.taxLabel)
                    await expect(element).toContainText(checkoutOverviewLabels.tax)
                })

                await test.step('32. The Total is displayed', async () => {
                    const element = newBrowser.locator(locatorCheckoutOverview.totalLabel)
                    await expect(element).toContainText(checkoutOverviewLabels.total)
                })

                await test.step('33. Click Finish button', async () => {
                    await clickFinishInCheckoutOverview(newBrowser)
                })

                await test.step('34. The order completion message is correct', async () => {
                    const element = newBrowser.locator(locatorCheckoutComplete.completeHeader)
                    await expect(element).toHaveText(messages.completeOrderHeader)
                })

                await test.step('35. The order completion text is correct', async () => {
                    const element = newBrowser.locator(locatorCheckoutComplete.completeText)
                    await expect(element).toHaveText(messages.completeOrderText)
                })

                await test.step('36. The Back Home button is displayed', async () => {
                    const element = newBrowser.locator(locatorCheckoutComplete.btnBackHome)
                    await expect(element).toBeVisible()
                })

                await test.step('37. Click Back Home button', async () => {
                    await clickBackHomeInCheckoutComplete(newBrowser)
                })

                await test.step('38. The first Inventory Item is displayed', async () => {
                    const element = newBrowser.locator(locatorCommon.inventoryItem).first()
                    await expect(element).toBeVisible()
                })
            })
        })
    })
})
