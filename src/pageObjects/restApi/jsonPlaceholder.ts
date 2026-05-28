import config from '../../config/config.json'
import { z } from 'zod'

const apiRestJsonPlaceholderUrl = config.apiRestJsonPlaceholderUrl

export interface getJsonPlaceholderResponseBody {
    userId: number
    id: number
    title: string
    body: string
}

export const getJsonPlaceholderResponseBodySchema = z.array(
    z.object({
        userId: z.number(),
        id: z.number(),
        title: z.string(),
        body: z.string(),
    })
)

export interface sendJsonPlaceholderBody {
    title: string
    body: string
    userId: number
}

export interface postJsonPlaceholderResponseBody {
    title: string
    body: string
    userId: number
    id: number
}

export const postJsonPlaceholderResponseBodySchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string(),
})

export class pageObjectJsonPlaceholder {
    async getJsonPlaceholder() {
        const header = {
            'Content-Type': 'application/json',
        }

        const startTime = performance.now()

        const response = await fetch(apiRestJsonPlaceholderUrl, {
            method: 'GET',
            headers: header,
        })

        const duration = performance.now() - startTime

        const responseBody = await response.json()

        return [response, responseBody, duration]
    }

    async createJsonPlaceholder(createBody: sendJsonPlaceholderBody) {
        const header = {
            'Content-Type': 'application/json',
        }

        const startTime = performance.now()

        const response = await fetch(apiRestJsonPlaceholderUrl, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(createBody),
        })

        const duration = performance.now() - startTime

        const responseBody = await response.json()

        return [response, responseBody, duration]
    }
}
