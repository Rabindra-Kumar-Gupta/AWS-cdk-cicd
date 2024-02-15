import { handler } from "../services/hello"

describe('hello describe test suite', () =>{
    test('handler should return 400', async ()=> {
        const result = await handler ({},{})
        expect(result.statusCode).toBe(200)
    })
})