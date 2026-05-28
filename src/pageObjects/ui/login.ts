import { Locator, Page, expect } from '@playwright/test'
import config from '../../config/config.json'

const defaultTimeout = config.defaultTimeout
const dataTestPrefix = config.dataTestPrefix

export const locatorLogin = {
    usernameInput: dataTestPrefix + 'username',
    passwordInput: dataTestPrefix + 'password',
    btnLogin: dataTestPrefix + 'login-button',
}

export class pageObjectLogin {
    readonly page: Page

    readonly expectWithLoweTimeout = expect.configure({ timeout: defaultTimeout })

    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly btnLogin: Locator

    constructor(page: Page) {
        this.page = page

        this.usernameInput = page.locator(locatorLogin.usernameInput)
        this.passwordInput = page.locator(locatorLogin.passwordInput)
        this.btnLogin = page.locator(locatorLogin.btnLogin)
    }

    async openLoginPage() {
        await this.page.goto(config.mainUrl, { timeout: defaultTimeout })
        await this.btnLogin.waitFor({ state: 'visible', timeout: defaultTimeout })
    }

    async fillName(name: string) {
        await this.usernameInput.clear({ timeout: defaultTimeout })
        await this.usernameInput.fill(name, { timeout: defaultTimeout })
    }

    async fillPassword(password: string) {
        await this.passwordInput.clear({ timeout: defaultTimeout })
        await this.passwordInput.fill(password, { timeout: defaultTimeout })
    }

    async clickOnLoginButton() {
        await this.btnLogin.click({ timeout: defaultTimeout })
    }

    async loginUser(name: string, password: string) {
        await this.fillName(name)
        await this.fillPassword(password)
        await this.clickOnLoginButton()
    }
}
