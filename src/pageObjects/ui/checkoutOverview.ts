import { Locator, Page, expect } from '@playwright/test'
import config from '../../config/config.json'

const defaultTimeout = config.defaultTimeout
const dataTestPrefix = config.dataTestPrefix

export const locatorCheckoutOverview = {
    paymentInfoLabel: dataTestPrefix + 'payment-info-label',
    paymentInfoValue: dataTestPrefix + 'payment-info-value',
    shippingInfoLabel: dataTestPrefix + 'shipping-info-label',
    shippingInfoValue: dataTestPrefix + 'shipping-info-value',
    totalInfoLabel: dataTestPrefix + 'total-info-label',
    subtotalLabel: dataTestPrefix + 'subtotal-label',
    taxLabel: dataTestPrefix + 'tax-label',
    totalLabel: dataTestPrefix + 'total-label',
    btnFinish: dataTestPrefix + 'finish',
    btnCancel: dataTestPrefix + 'cancel',
}

export class pageObjectCheckoutOverview {
    readonly page: Page

    readonly expectWithLoweTimeout = expect.configure({ timeout: defaultTimeout })

    readonly paymentInfoLabel: Locator
    readonly paymentInfoValue: Locator
    readonly shippingInfoLabel: Locator
    readonly shippingInfoValue: Locator
    readonly totalInfoLabel: Locator
    readonly subtotalLabel: Locator
    readonly taxLabel: Locator
    readonly totalLabel: Locator
    readonly btnFinish: Locator
    readonly btnCancel: Locator

    constructor(page: Page) {
        this.page = page

        this.paymentInfoLabel = page.locator(locatorCheckoutOverview.paymentInfoLabel)
        this.paymentInfoValue = page.locator(locatorCheckoutOverview.paymentInfoValue)
        this.shippingInfoLabel = page.locator(locatorCheckoutOverview.shippingInfoLabel)
        this.shippingInfoValue = page.locator(locatorCheckoutOverview.shippingInfoValue)
        this.totalInfoLabel = page.locator(locatorCheckoutOverview.totalInfoLabel)
        this.subtotalLabel = page.locator(locatorCheckoutOverview.subtotalLabel)
        this.taxLabel = page.locator(locatorCheckoutOverview.taxLabel)
        this.totalLabel = page.locator(locatorCheckoutOverview.totalLabel)
        this.btnFinish = page.locator(locatorCheckoutOverview.btnFinish)
        this.btnCancel = page.locator(locatorCheckoutOverview.btnCancel)
    }

    async clickFinish() {
        await clickFinishInCheckoutOverview(this.page)
    }

    async clickCancel() {
        await clickCancelInCheckoutOverview(this.page)
    }
}

export async function clickFinishInCheckoutOverview(tab: Page) {
    await tab.locator(locatorCheckoutOverview.btnFinish).click({ timeout: defaultTimeout })
}

export async function clickCancelInCheckoutOverview(tab: Page) {
    await tab.locator(locatorCheckoutOverview.btnCancel).click({ timeout: defaultTimeout })
}
