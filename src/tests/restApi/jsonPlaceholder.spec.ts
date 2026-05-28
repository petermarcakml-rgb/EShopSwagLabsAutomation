import { expect, test } from '@playwright/test'
import { 
    pageObjectJsonPlaceholder, getJsonPlaceholderResponseBody, getJsonPlaceholderResponseBodySchema, sendJsonPlaceholderBody,
    postJsonPlaceholderResponseBody, postJsonPlaceholderResponseBodySchema
} from '../../pageObjects/restApi/jsonPlaceholder.ts'
import creationTestData from '../../testData/jsonPlaceholderCreation.json'

test.describe('JsonPlaceholder REST API', () => {
    let poJsonPlaceholder: pageObjectJsonPlaceholder

    let getJsonPlaceholderResponse: [Response, getJsonPlaceholderResponseBody[], number]
    let postJsonPlaceholderResponse: [Response, getJsonPlaceholderResponseBody, number]

    const maximumAcceptableDuration = 2000

    test.beforeAll(async () => {
        poJsonPlaceholder = new pageObjectJsonPlaceholder()
    })

    test.describe('GET and POST JsonPlaceholder', async () => {
        test.describe('GET JsonPlaceholder', async () => {
            test('Check GET request of JsonPlaceholder', async () => {
                test.setTimeout(20000) // setting timeout for 20 seconds

                await test.step('1. GET JsonPlaceholder', async () => {
                    const result = await poJsonPlaceholder.getJsonPlaceholder()
                    getJsonPlaceholderResponse = result as [Response, getJsonPlaceholderResponseBody[], number]
                })

                await test.step('2. Response status and text is correct', async () => {
                    expect(getJsonPlaceholderResponse[0].status).toBe(200)
                    expect(getJsonPlaceholderResponse[0].statusText).toBe('OK')
                })

                await test.step('3. Checking some values in response body', async () => {
                    expect(getJsonPlaceholderResponse[1][0]).toHaveProperty('userId')
                    expect(getJsonPlaceholderResponse[1][0].userId).toBe(1)
                })

                await test.step('4. Response body schema is valid', async () => {
                    const responseBody = getJsonPlaceholderResponse[1]
                    const result = getJsonPlaceholderResponseBodySchema.safeParse(responseBody)
                    expect(result.success, `Schema validation failed: ${JSON.stringify(result.error?.format())}`).toBe(true)
                })

                await test.step('5. Duration is within acceptable range', async () => {
                    expect(getJsonPlaceholderResponse[2]).toBeLessThan(maximumAcceptableDuration)
                })

                await test.step('6. In console log print out length of array', async () => {
                    const lengthOfArray = getJsonPlaceholderResponse[1].length
                    console.log(`Length of array in response body: ${lengthOfArray}`)
                })

                await test.step('7. The length of array is more than 2', async () => {
                    const numberOfArrays = getJsonPlaceholderResponse[1].length
                    expect(numberOfArrays).toBeGreaterThan(2)
                })
            })
        })

        test.describe('POST JsonPlaceholder', async () => {
            for (const data of creationTestData) {
                test(`POST - Create JsonPlaceholder: ${data.title}`, async () => {
                    test.setTimeout(20000)

                    const createJsonPlaceholderBody: sendJsonPlaceholderBody = {
                        title: data.title,
                        body: data.body,
                        userId: data.userId,
                    }

                    await test.step('1. POST JsonPlaceholder', async () => {
                        const result = await poJsonPlaceholder.createJsonPlaceholder(createJsonPlaceholderBody)
                        postJsonPlaceholderResponse = result as [Response, postJsonPlaceholderResponseBody, number]
                    })

                    await test.step('2. Response status and text is correct', async () => {
                        expect(postJsonPlaceholderResponse[0].status).toBe(201)
                        expect(postJsonPlaceholderResponse[0].statusText).toBe('Created')
                    })

                    await test.step('3. Title field is present in response body', async () => {
                        expect(postJsonPlaceholderResponse[1]).toHaveProperty('title')
                    })

                    await test.step('4. Title value in response body is correct', async () => {
                        expect(postJsonPlaceholderResponse[1].title).toBe(createJsonPlaceholderBody.title)
                    })

                    await test.step('5. Body field is present in response body', async () => {
                        expect(postJsonPlaceholderResponse[1]).toHaveProperty('body')
                    })

                    await test.step('6. Body value in response body is correct', async () => {
                        expect(postJsonPlaceholderResponse[1].body).toBe(createJsonPlaceholderBody.body)
                    })

                    await test.step('7. User ID field is present in response body', async () => {
                        expect(postJsonPlaceholderResponse[1]).toHaveProperty('userId')
                    })

                    await test.step('8. User ID value in response body is correct', async () => {
                        expect(postJsonPlaceholderResponse[1].userId).toBe(createJsonPlaceholderBody.userId)
                    })

                    await test.step('9. Response body schema is valid', async () => {
                        const responseBody = postJsonPlaceholderResponse[1]
                        const result = postJsonPlaceholderResponseBodySchema.safeParse(responseBody)
                        expect(result.success, `Schema validation failed: ${JSON.stringify(result.error?.format())}`).toBe(true)
                    })

                    await test.step('10. Duration is within acceptable range', async () => {
                        expect(postJsonPlaceholderResponse[2]).toBeLessThan(maximumAcceptableDuration)
                    })
                })
            }
        })
    })
})
