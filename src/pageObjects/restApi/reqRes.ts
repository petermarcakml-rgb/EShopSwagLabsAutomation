import config from '../../config/config.json'
import { z } from 'zod'

const apiRestReqResUrl = config.apiRestReqResUrl
const apiRestReqResApiKey = config.apiRestReqResApiKey

export interface getReqResUsersResponseBody {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: {
        id: number
        email: string
        first_name: string
        last_name: string
        avatar: string
    }[]
}

export const getReqResUsersSchema = z.object({
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number(),
    data: z.array(
        z.object({
            id: z.number(),
            email: z.string(),
            first_name: z.string(),
            last_name: z.string(),
            avatar: z.string(),
        })
    ),
})

export interface sendReqResUserBody {
    name: string
    job: string
}

export interface postReqResUserResponseBody {
    name: string
    job: string
    id: string
    createdAt: string
}

export const postReqResUserResponseBodySchema = z.object({
    name: z.string(),
    job: z.string(),
    id: z.string(),
    createdAt: z.string().datetime(),
})

export class pageObjectReqRes {
    async getReqResUsers(page: number) {
        const header = {
            'Content-Type': 'application/json',
            'x-api-key': apiRestReqResApiKey,
        }

        const startTime = performance.now()

        const response = await fetch(apiRestReqResUrl + '?page=' + page, {
            method: 'GET',
            headers: header,
        })

        const duration = performance.now() - startTime

        const responseBody = await response.json()

        return [response, responseBody, duration]
    }

    async createReqResUser(createBody: sendReqResUserBody) {
        const header = {
            'Content-Type': 'application/json',
            'x-api-key': apiRestReqResApiKey,
        }

        const startTime = performance.now()

        const response = await fetch(apiRestReqResUrl, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(createBody),
        })

        const duration = performance.now() - startTime

        const responseBody = await response.json()

        return [response, responseBody, duration]
    }
}
