import { http, HttpResponse, StrictResponse } from 'msw'

export const handlers = [
  http.post('/api/users', async () => {
    return HttpResponse.text(JSON.stringify('ok'), {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
      },
    })
  }),
]
