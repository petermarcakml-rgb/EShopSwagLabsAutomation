import { Locator, Page, expect } from '@playwright/test'
import config from '../../config/config.json'
import moment from 'moment'

const defaultTimeout = config.defaultTimeout
const dataTestPrefix = config.dataTestPrefix

export const locatorCommon = {
    openMenu: '#react-burger-menu-btn',
    btnLogoutSidebarLink: dataTestPrefix + 'logout-sidebar-link',
    lblTitle: dataTestPrefix + 'title',
    inventoryItem: dataTestPrefix + 'inventory-item',
    generalInventoryItemName: dataTestPrefix + 'inventory-item-name',
    generalInventoryItemDescription: dataTestPrefix + 'inventory-item-desc',
    generalInventoryItemPrice: dataTestPrefix + 'inventory-item-price',
    errorMessage: dataTestPrefix + 'error',
    btnErrorX: dataTestPrefix + 'error-button',
    btnRemoveFromCartSauceLabsBackpack: dataTestPrefix + 'remove-sauce-labs-backpack',
    btnRemoveFromCartSauceLabsBikeLight: dataTestPrefix + 'remove-sauce-labs-bike-light',
    btnRemoveFromCartSauceLabsBoltTShirt: dataTestPrefix + 'remove-sauce-labs-bolt-t-shirt',
    btnRemoveFromCartSauceLabsFleeceJacket: dataTestPrefix + 'remove-sauce-labs-fleece-jacket',
    btnRemoveFromCartSauceLabsOnesie: dataTestPrefix + 'remove-sauce-labs-onesie',
    btnRemoveFromCartTestAllTheThings: dataTestPrefix + 'remove-test.allthethings()-t-shirt-(red)',
}

export class pageObjectCommon {
    readonly page: Page

    readonly expectWithLoweTimeout = expect.configure({ timeout: defaultTimeout })

    readonly openMenu: Locator
    readonly btnLogoutSidebarLink: Locator
    readonly lblTitle: Locator
    readonly inventoryItem: Locator
    readonly generalInventoryItemName: Locator
    readonly generalInventoryItemDescription: Locator
    readonly generalInventoryItemPrice: Locator
    readonly errorMessage: Locator
    readonly btnErrorX: Locator
    readonly btnRemoveFromCartSauceLabsBackpack: Locator
    readonly btnRemoveFromCartSauceLabsBikeLight: Locator
    readonly btnRemoveFromCartSauceLabsFleeceJacket: Locator
    readonly btnRemoveFromCartSauceLabsBoltTShirt: Locator
    readonly btnRemoveFromCartSauceLabsOnesie: Locator
    readonly btnRemoveFromCartTestAllTheThings: Locator

    constructor(page: Page) {
        this.page = page

        this.openMenu = page.locator(locatorCommon.openMenu)
        this.btnLogoutSidebarLink = page.locator(locatorCommon.btnLogoutSidebarLink)
        this.lblTitle = page.locator(locatorCommon.lblTitle)
        this.inventoryItem = page.locator(locatorCommon.inventoryItem)
        this.generalInventoryItemName = page.locator(locatorCommon.generalInventoryItemName)
        this.generalInventoryItemDescription = page.locator(locatorCommon.generalInventoryItemDescription)
        this.generalInventoryItemPrice = page.locator(locatorCommon.generalInventoryItemPrice)
        this.errorMessage = page.locator(locatorCommon.errorMessage)
        this.btnErrorX = page.locator(locatorCommon.btnErrorX)
        this.btnRemoveFromCartSauceLabsBackpack = page.locator(locatorCommon.btnRemoveFromCartSauceLabsBackpack)
        this.btnRemoveFromCartSauceLabsBikeLight = page.locator(locatorCommon.btnRemoveFromCartSauceLabsBikeLight)
        this.btnRemoveFromCartSauceLabsBoltTShirt = page.locator(locatorCommon.btnRemoveFromCartSauceLabsBoltTShirt)
        this.btnRemoveFromCartSauceLabsFleeceJacket = page.locator(locatorCommon.btnRemoveFromCartSauceLabsFleeceJacket)
        this.btnRemoveFromCartSauceLabsOnesie = page.locator(locatorCommon.btnRemoveFromCartSauceLabsOnesie)
        this.btnRemoveFromCartTestAllTheThings = page.locator(locatorCommon.btnRemoveFromCartTestAllTheThings)
    }

    async logoutUser() {
        await this.openMenu.click({ timeout: defaultTimeout })
        await this.btnLogoutSidebarLink.click({ timeout: defaultTimeout })
        await this.btnLogoutSidebarLink.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }

    async clickRemoveFromCartSauceLabsBackpack() {
        await this.btnRemoveFromCartSauceLabsBackpack.click({ timeout: defaultTimeout })
        await this.btnRemoveFromCartSauceLabsBackpack.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }

    async clickRemoveFromCartSauceLabsBikeLight() {
        await this.btnRemoveFromCartSauceLabsBikeLight.click({ timeout: defaultTimeout })
        await this.btnRemoveFromCartSauceLabsBikeLight.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }

    async clickRemoveFromCartSauceLabsBoltTShirt() {
        await this.btnRemoveFromCartSauceLabsBoltTShirt.click({ timeout: defaultTimeout })
        await this.btnRemoveFromCartSauceLabsBoltTShirt.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }

    async clickRemoveFromCartSauceLabsFleeceJacket() {
        await this.btnRemoveFromCartSauceLabsFleeceJacket.click({ timeout: defaultTimeout })
        await this.btnRemoveFromCartSauceLabsFleeceJacket.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }

    async clickRemoveFromCartSauceLabsOnesie() {
        await this.btnRemoveFromCartSauceLabsOnesie.click({ timeout: defaultTimeout })
        await this.btnRemoveFromCartSauceLabsOnesie.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }

    async clickRemoveFromCartTestAllTheThings() {
        await this.btnRemoveFromCartTestAllTheThings.click({ timeout: defaultTimeout })
        await this.btnRemoveFromCartTestAllTheThings.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }

    async closeErrorMessage() {
        await this.btnErrorX.click({ timeout: defaultTimeout })
        await this.btnErrorX.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }
}

export function pickMultipleRandom<T>(array: T[], count: number): T[] {
    if (count > array.length) {
        throw new Error("Requested number of items is greater than the array length.")
    }

    // 1. Clone the original array to avoid mutations
    const arrayCopy = [...array]

    // 2. Shuffle array elements using Fisher-Yates algorithm
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }

    // 3. Slice and return the requested number of items
    return arrayCopy.slice(0, count);
}

export function getTimeStampWithMilliseconds(offsetDays = 0): string {
  const date = new Date()
  date.setDate(date.getDate() + offsetDays)
  return moment(date).format('YYYYMMDDHHmmssSSS')
}
