import { Locator, Page, expect } from '@playwright/test'
import config from '../../config/config.json'
import { pageObjectCommon, locatorCommon } from './common.ts'

const defaultTimeout = config.defaultTimeout
const dataTestPrefix = config.dataTestPrefix

export const locatorCheckoutComplete = {
    completeHeader: dataTestPrefix + 'complete-header',
    completeText: dataTestPrefix + 'complete-text',
    btnBackHome: dataTestPrefix + 'back-to-products',
}

export class pageObjectCheckoutComplete {
    readonly page: Page
    readonly poCommon: pageObjectCommon

    readonly expectWithLoweTimeout = expect.configure({ timeout: defaultTimeout })

    readonly completeHeader: Locator
    readonly completeText: Locator
    readonly btnBackHome: Locator

    constructor(page: Page) {
        this.page = page
        this.poCommon = new pageObjectCommon(page)

        this.completeHeader = page.locator(locatorCheckoutComplete.completeHeader)
        this.completeText = page.locator(locatorCheckoutComplete.completeText)
        this.btnBackHome = page.locator(locatorCheckoutComplete.btnBackHome)
    }

    async clickBackHome() {
        await clickBackHomeInCheckoutComplete(this.page)
    }
}

export async function clickBackHomeInCheckoutComplete(tab: Page) {
    await tab.locator(locatorCheckoutComplete.btnBackHome).click({ timeout: defaultTimeout })
    await tab.locator(locatorCommon.inventoryItem).first().waitFor({ state: 'visible', timeout: defaultTimeout })
}
