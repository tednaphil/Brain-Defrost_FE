
const getGame = async () => {
    try {
        const response = await fetch('https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games/1')
        if(!response.ok) {
            const status = response.status
            console.log(status)
            throw new Error(`Couldn't get game ${status}`)
        }
        return await response.json();
    }
    catch (error: unknown) {
        console.log('API CALLS catch block - game', error)
        throw error
    }
}
export { getGame }