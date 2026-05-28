import { Locator, Page, expect } from '@playwright/test'
import config from '../../config/config.json'

const defaultTimeout = config.defaultTimeout
const dataTestPrefix = config.dataTestPrefix

export const locatorCart = {
    btnRemoveSauceLabsBackpack: dataTestPrefix + 'remove-sauce-labs-backpack',
    btnRemoveSauceLabsBikeLight: dataTestPrefix + 'remove-sauce-labs-bike-light',
    btnRemoveSauceLabsBoltTShirt: dataTestPrefix + 'remove-sauce-labs-bolt-t-shirt',
    btnRemoveSauceLabsFleeceJacket: dataTestPrefix + 'remove-sauce-labs-fleece-jacket',
    btnRemoveSauceLabsOnesie: dataTestPrefix + 'remove-sauce-labs-onesie',
    btnRemoveTestAllTheThingsTShirtRed: dataTestPrefix + 'remove-test.allthethings()-t-shirt-(red)',
    btnCheckout: dataTestPrefix + 'checkout',
    btnContinueShopping: dataTestPrefix + 'continue-shopping',
}

export class pageObjectCart {
    readonly page: Page

    readonly expectWithLoweTimeout = expect.configure({ timeout: defaultTimeout })

    readonly btnRemoveSauceLabsBackpack: Locator
    readonly btnRemoveSauceLabsBikeLight: Locator
    readonly btnRemoveSauceLabsBoltTShirt: Locator
    readonly btnRemoveSauceLabsFleeceJacket: Locator
    readonly btnRemoveSauceLabsOnesie: Locator
    readonly btnRemoveTestAllTheThingsTShirtRed: Locator
    readonly btnCheckout: Locator
    readonly btnContinueShopping: Locator

    constructor(page: Page) {
        this.page = page

        this.btnRemoveSauceLabsBackpack = page.locator(locatorCart.btnRemoveSauceLabsBackpack)
        this.btnRemoveSauceLabsBikeLight = page.locator(locatorCart.btnRemoveSauceLabsBikeLight)
        this.btnRemoveSauceLabsBoltTShirt = page.locator(locatorCart.btnRemoveSauceLabsBoltTShirt)
        this.btnRemoveSauceLabsFleeceJacket = page.locator(locatorCart.btnRemoveSauceLabsFleeceJacket)
        this.btnRemoveSauceLabsOnesie = page.locator(locatorCart.btnRemoveSauceLabsOnesie)
        this.btnRemoveTestAllTheThingsTShirtRed = page.locator(locatorCart.btnRemoveTestAllTheThingsTShirtRed)
        this.btnCheckout = page.locator(locatorCart.btnCheckout)
        this.btnContinueShopping = page.locator(locatorCart.btnContinueShopping)
    }

    async clickCheckout() {
        await clickCheckout(this.page)
    }

    async clickContinueShopping() {
        await this.btnContinueShopping.click({ timeout: defaultTimeout })
    }
}

export async function clickCheckout(tab: Page) {
    await tab.locator(locatorCart.btnCheckout).click({ timeout: defaultTimeout })
}
