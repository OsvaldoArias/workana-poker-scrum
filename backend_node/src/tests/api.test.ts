import request from 'supertest'
import { server } from '..'

afterEach(() => {
  server.close()
})
describe('Test Issue endpoints', () => {
  it('returns 404', async (done) => {
    const res = await request(server).get('/api/issues/1').send()
    expect(res.status).toEqual(401)
    done()
  })
})
