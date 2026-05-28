import { expect, test } from '@playwright/test'
import { 
    pageObjectReqRes, getReqResUsersResponseBody, getReqResUsersSchema, sendReqResUserBody,
    postReqResUserResponseBody, postReqResUserResponseBodySchema
} from '../../pageObjects/restApi/reqRes.ts'
import createUserTestData from '../../testData/reqResCreateUser.json'

test.describe('ReqRes REST API', () => {
    let poReqRes: pageObjectReqRes

    let getReqResResponse: [Response, getReqResUsersResponseBody, number]
    let postReqResResponse: [Response, postReqResUserResponseBody, number]

    const maximumAcceptableDuration = 200

    test.beforeAll(async () => {
        poReqRes = new pageObjectReqRes()
    })

    test.describe('GET and POST ReqRes', async () => {
        test.describe('GET ReqRes', async () => {
            test('Check GET request of ReqRes', async () => {
                test.setTimeout(10000) // setting timeout for 10 seconds

                const page = 2
                const firstLastName = 'Lawson'
                const secondLastName = 'Ferguson'

                await test.step('1. GET ReqRes', async () => {
                    const result = await poReqRes.getReqResUsers(page)
                    getReqResResponse = result as [Response, getReqResUsersResponseBody, number]
                })

                await test.step('2. Response status and text is correct', async () => {
                    expect(getReqResResponse[0].status).toBe(200)
                    expect(getReqResResponse[0].statusText).toBe('OK')
                })

                await test.step('3. Total value in response body is correct', async () => {
                    const totalPagesValue = getReqResResponse[1].total_pages
                    const perPageValue = getReqResResponse[1].per_page
                    const totalValueCalculated = totalPagesValue * perPageValue

                    const totalValue = getReqResResponse[1].total
                    expect(totalValue).toBe(totalValueCalculated)
                })

                await test.step('4. Total value matches with length of data', async () => {
                    const perPageValue = getReqResResponse[1].per_page
                    const lengthOfData = getReqResResponse[1].data.length
                    expect(perPageValue).toBe(lengthOfData)
                })

                await test.step('5. Last Name for the first User in data is correct', async () => {
                    expect(getReqResResponse[1].data[0].last_name).toBe(firstLastName)
                })

                await test.step('6. Last Name for the second User in data is correct', async () => {
                    expect(getReqResResponse[1].data[1].last_name).toBe(secondLastName)
                })

                await test.step('7. Response body schema is valid', async () => {
                    const responseBody = getReqResResponse[1]
                    const result = getReqResUsersSchema.safeParse(responseBody)
                    expect(result.success, `Schema validation failed: ${JSON.stringify(result.error?.format())}`).toBe(true)
                })
            })
        })

        test.describe('POST ReqRes', async () => {
            for (const data of createUserTestData) {
                test(`POST - Create user: ${data.name}`, async () => {
                    test.setTimeout(10000)

                    const createJsonPlaceholderBody: sendReqResUserBody = {
                        name: data.name,
                        job: data.job,
                    }

                    await test.step('1. POST ReqRes', async () => {
                        const result = await poReqRes.createReqResUser(createJsonPlaceholderBody)
                        postReqResResponse = result as [Response, postReqResUserResponseBody, number]
                    })

                    await test.step('2. Response status and text are correct', async () => {
                        expect(postReqResResponse[0].status).toBe(201)
                        expect(postReqResResponse[0].statusText).toBe('Created')
                    })

                    await test.step('3. ID field is as string', async () => {
                        expect(typeof postReqResResponse[1].id).toBe('string')
                    })

                    await test.step('4. createdAt field is not returned as null but is returned as timestamp', async () => {
                        expect(Date.parse(postReqResResponse[1].createdAt)).not.toBeNaN()
                        expect(postReqResResponse[1].createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
                    })

                    await test.step('5. Name field in response body is correct', async () => {
                        expect(postReqResResponse[1].name).toBe(createJsonPlaceholderBody.name)
                    })

                    await test.step('6. Response body schema is valid', async () => {
                        const responseBody = postReqResResponse[1]
                        const result = postReqResUserResponseBodySchema.safeParse(responseBody)
                        expect(result.success, `Schema validation failed: ${JSON.stringify(result.error?.format())}`).toBe(true)
                    })

                    await test.step('7. Duration is within acceptable range', async () => {
                        expect(postReqResResponse[2]).toBeLessThan(maximumAcceptableDuration)
                    })
                })
            }
        })
    })
})
