import { Locator, Page, expect } from '@playwright/test'
import config from '../../config/config.json'

const defaultTimeout = config.defaultTimeout
const dataTestPrefix = config.dataTestPrefix

export const locatorCheckoutYourInformation = {
    firstNameInput: dataTestPrefix + 'firstName',
    lastNameInput: dataTestPrefix + 'lastName',
    postalCodeInput: dataTestPrefix + 'postalCode',
    btncontinue: dataTestPrefix + 'continue',
    btncancel: dataTestPrefix + 'cancel',
}

export class pageObjectCheckoutYourInformation {
    readonly page: Page

    readonly expectWithLoweTimeout = expect.configure({ timeout: defaultTimeout })

    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly postalCodeInput: Locator
    readonly btncontinue: Locator
    readonly btncancel: Locator

    constructor(page: Page) {
        this.page = page

        this.firstNameInput = page.locator(locatorCheckoutYourInformation.firstNameInput)
        this.lastNameInput = page.locator(locatorCheckoutYourInformation.lastNameInput)
        this.postalCodeInput = page.locator(locatorCheckoutYourInformation.postalCodeInput)
        this.btncontinue = page.locator(locatorCheckoutYourInformation.btncontinue)
        this.btncancel = page.locator(locatorCheckoutYourInformation.btncancel)
    }

    async fillFirstName(firstName: string) {
        await fillFirstNameInCheckoutYourInformation(this.page, firstName)
    }

    async fillLastName(lastName: string) {
        await fillLastNameInCheckoutYourInformation(this.page, lastName)
    }

    async fillPostalCode(postalCode: string) {
        await fillPostalCodeInCheckoutYourInformation(this.page, postalCode)
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await fillCheckoutInformation(this.page, firstName, lastName, postalCode)
    }

    async clickContinue() {
        await clickContinueInCheckoutYourInformation(this.page)
    }

    async clickCancel() {
        await clickCancelInCheckoutYourInformation(this.page)
    }
}

export async function fillFirstNameInCheckoutYourInformation(tab: Page, firstName: string) {
    await tab.locator(locatorCheckoutYourInformation.firstNameInput).clear({ timeout: defaultTimeout })
    await tab.locator(locatorCheckoutYourInformation.firstNameInput).fill(firstName, { timeout: defaultTimeout })
}

export async function fillLastNameInCheckoutYourInformation(tab: Page, lastName: string) {
    await tab.locator(locatorCheckoutYourInformation.lastNameInput).clear({ timeout: defaultTimeout })
    await tab.locator(locatorCheckoutYourInformation.lastNameInput).fill(lastName, { timeout: defaultTimeout })
}

export async function fillPostalCodeInCheckoutYourInformation(tab: Page, postalCode: string) {
    await tab.locator(locatorCheckoutYourInformation.postalCodeInput).clear({ timeout: defaultTimeout })
    await tab.locator(locatorCheckoutYourInformation.postalCodeInput).fill(postalCode, { timeout: defaultTimeout })
}

export async function fillCheckoutInformation(tab: Page, firstName: string, lastName: string, postalCode: string) {
    await fillFirstNameInCheckoutYourInformation(tab, firstName)
    await fillLastNameInCheckoutYourInformation(tab, lastName)
    await fillPostalCodeInCheckoutYourInformation(tab, postalCode)
}

export async function clickContinueInCheckoutYourInformation(tab: Page) {
    await tab.locator(locatorCheckoutYourInformation.btncontinue).click({ timeout: defaultTimeout })
}

export async function clickCancelInCheckoutYourInformation(tab: Page) {
    await tab.locator(locatorCheckoutYourInformation.btncancel).click({ timeout: defaultTimeout })
}
