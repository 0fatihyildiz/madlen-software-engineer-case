const BASE_URL = import.meta.env.VITE_BASE_URL

async function fetcher(endpoint: string, options = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, options)
    if (!res.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await res.json() as { body: any }
    return data.body
}

export default fetcher
