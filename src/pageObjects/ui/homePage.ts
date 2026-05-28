import { Locator, Page, expect } from '@playwright/test'
import config from '../../config/config.json'
import { inventoryItems } from '../../config/constants'
import { pickMultipleRandom } from './common'

const defaultTimeout = config.defaultTimeout
const dataTestPrefix = config.dataTestPrefix
const inventoryNumberItems = ['1', '2', '3', '4', '5', '6']

export const locatorHomePage = {
    btnAddToCartSauceLabsBackpack: dataTestPrefix + 'add-to-cart-sauce-labs-backpack',
    btnAddToCartSauceLabsBikeLight: dataTestPrefix + 'add-to-cart-sauce-labs-bike-light',
    btnAddToCartSauceLabsBoltTShirt: dataTestPrefix + 'add-to-cart-sauce-labs-bolt-t-shirt',
    btnAddToCartSauceLabsFleeceJacket: dataTestPrefix + 'add-to-cart-sauce-labs-fleece-jacket',
    btnAddToCartSauceLabsOnesie: dataTestPrefix + 'add-to-cart-sauce-labs-onesie',
    btnAddToCartTestAllTheThings: dataTestPrefix + 'add-to-cart-test.allthethings()-t-shirt-(red)',
    btnShoppingCartLink: dataTestPrefix + 'shopping-cart-link',
    shoppingCartBadge: dataTestPrefix + 'shopping-cart-badge',
}

export interface inventorySelectedItemInterface {
    selectedNameItems: string[]
    selectedDescriptionItems: string[]
    selectedPriceStringValueItems: string[]
    selectedPriceItems: number[]
}

export class pageObjectHomePage {
    readonly page: Page

    readonly expectWithLoweTimeout = expect.configure({ timeout: defaultTimeout })

    readonly btnAddToCartSauceLabsBackpack: Locator
    readonly btnAddToCartSauceLabsBikeLight: Locator
    readonly btnAddToCartSauceLabsBoltTShirt: Locator
    readonly btnAddToCartSauceLabsFleeceJacket: Locator
    readonly btnAddToCartSauceLabsOnesie: Locator
    readonly btnAddToCartTestAllTheThings: Locator
    readonly btnShoppingCartLink: Locator
    readonly shoppingCartBadge: Locator

    constructor(page: Page) {
        this.page = page

        this.btnAddToCartSauceLabsBackpack = page.locator(locatorHomePage.btnAddToCartSauceLabsBackpack)
        this.btnAddToCartSauceLabsBikeLight = page.locator(locatorHomePage.btnAddToCartSauceLabsBikeLight)
        this.btnAddToCartSauceLabsBoltTShirt = page.locator(locatorHomePage.btnAddToCartSauceLabsBoltTShirt)
        this.btnAddToCartSauceLabsFleeceJacket = page.locator(locatorHomePage.btnAddToCartSauceLabsFleeceJacket)
        this.btnAddToCartSauceLabsOnesie = page.locator(locatorHomePage.btnAddToCartSauceLabsOnesie)
        this.btnAddToCartTestAllTheThings = page.locator(locatorHomePage.btnAddToCartTestAllTheThings)
        this.btnShoppingCartLink = page.locator(locatorHomePage.btnShoppingCartLink)
        this.shoppingCartBadge = page.locator(locatorHomePage.shoppingCartBadge)
    }

    async clickAddToCartSauceLabsBackpack() {
        await this.btnAddToCartSauceLabsBackpack.click({ timeout: defaultTimeout })
        await this.btnAddToCartSauceLabsBackpack.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }

    async clickAddToCartSauceLabsBikeLight() {
        await this.btnAddToCartSauceLabsBikeLight.click({ timeout: defaultTimeout })
        await this.btnAddToCartSauceLabsBikeLight.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }

    async clickAddToCartSauceLabsBoltTShirt() {
        await this.btnAddToCartSauceLabsBoltTShirt.click({ timeout: defaultTimeout })
        await this.btnAddToCartSauceLabsBoltTShirt.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }

    async clickAddToCartSauceLabsFleeceJacket() {
        await this.btnAddToCartSauceLabsFleeceJacket.click({ timeout: defaultTimeout })
        await this.btnAddToCartSauceLabsFleeceJacket.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }

    async clickAddToCartSauceLabsOnesie() {
        await this.btnAddToCartSauceLabsOnesie.click({ timeout: defaultTimeout })
        await this.btnAddToCartSauceLabsOnesie.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }

    async clickAddToCartTestAllTheThings() {
        await this.btnAddToCartTestAllTheThings.click({ timeout: defaultTimeout })
        await this.btnAddToCartTestAllTheThings.waitFor({ state: 'hidden', timeout: defaultTimeout })
    }

    async clickShoppingCartLink() {
        await clickShoppingCartLink(this.page)
    }

    async selectRandomInventoryItems(count: number) {
        const selectedNameItems: string[] = []
        const selectedDescriptionItems: string[] = []
        const selectedPriceStringValueItems: string[] = []
        const selectedPriceItems: number[] = []

        const randomItems = pickMultipleRandom(inventoryNumberItems, count)

        for (let i = 0; i < count; i++) {
            const randomItem = randomItems[i]

            console.log(`Randomly selected inventory item: ${randomItem}`)

            const itemSelected = await this.selectInventoryItem(randomItem)
            selectedNameItems.push((itemSelected[0] as string)?.trim() || '')
            selectedDescriptionItems.push((itemSelected[1] as string)?.trim() || '')
            selectedPriceStringValueItems.push((itemSelected[2] as string)?.trim() || '')
            selectedPriceItems.push(itemSelected[3] as number || 0)
        }

        return [selectedNameItems, selectedDescriptionItems, selectedPriceStringValueItems, selectedPriceItems]
    }

    async selectInventoryItem(inventoryItem: string) {
        let itemNameSelected: string = ''
        let itemDescriptionSelected: string = ``
        let itemPriceStringValueSelected: string = ''
        let itemPriceSelected: number = 0

        switch (inventoryItem) {
            case '1':
                itemNameSelected = inventoryItems.sauceLabsBackpackName
                itemDescriptionSelected = inventoryItems.sauceLabsBackpackDescription
                itemPriceStringValueSelected = inventoryItems.sauceLabsBackpackPriceStringValue
                itemPriceSelected = inventoryItems.sauceLabsBackpackPrice
                await this.clickAddToCartSauceLabsBackpack()
                break
            case '2':
                itemNameSelected = inventoryItems.sauceLabsBikeLightName
                itemDescriptionSelected = inventoryItems.sauceLabsBikeLightDescription
                itemPriceStringValueSelected = inventoryItems.sauceLabsBikeLightPriceStringValue
                itemPriceSelected = inventoryItems.sauceLabsBikeLightPrice
                await this.clickAddToCartSauceLabsBikeLight()
                break
            case '3':
                itemNameSelected = inventoryItems.sauceLabsBoltTShirtName
                itemDescriptionSelected = inventoryItems.sauceLabsBoltTShirtDescription
                itemPriceStringValueSelected = inventoryItems.sauceLabsBoltTShirtPriceStringValue
                itemPriceSelected = inventoryItems.sauceLabsBoltTShirtPrice
                await this.clickAddToCartSauceLabsBoltTShirt()
                break
            case '4':
                itemNameSelected = inventoryItems.sauceLabsFleeceJacketName
                itemDescriptionSelected = inventoryItems.sauceLabsFleeceJacketDescription
                itemPriceStringValueSelected = inventoryItems.sauceLabsFleeceJacketPriceStringValue
                itemPriceSelected = inventoryItems.sauceLabsFleeceJacketPrice
                await this.clickAddToCartSauceLabsFleeceJacket()
                break
            case '5':
                itemNameSelected = inventoryItems.sauceLabsOnesieName
                itemDescriptionSelected = inventoryItems.sauceLabsOnesieDescription
                itemPriceStringValueSelected = inventoryItems.sauceLabsOnesiePriceStringValue
                itemPriceSelected = inventoryItems.sauceLabsOnesiePrice
                await this.clickAddToCartSauceLabsOnesie()
                break
            case '6':
                itemNameSelected = inventoryItems.testAllTheThingsTShirtRedName
                itemDescriptionSelected = inventoryItems.testAllTheThingsTShirtRedDescription
                itemPriceStringValueSelected = inventoryItems.testAllTheThingsTShirtRedPriceStringValue
                itemPriceSelected = inventoryItems.testAllTheThingsTShirtRedPrice
                await this.clickAddToCartTestAllTheThings()
                break
            default:
                console.log('Unsupported Inventory Item')
                break
        }

        return [itemNameSelected, itemDescriptionSelected, itemPriceStringValueSelected, itemPriceSelected]
    }
}

export async function clickShoppingCartLink(tab: Page) {
    await tab.locator(locatorHomePage.btnShoppingCartLink).click({ timeout: defaultTimeout })
}
