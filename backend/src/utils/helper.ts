export function createApiResponse<T>(status: number, data: T) {
    return {
        status,
        body: data
    }
}
