import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { createSessionValidator } from '#validators/session'

export default class SessionController {
  /**
   * @store
   * @description Faz login
   * @requestBody {"login": "login", "password": "password"}
   * @responseBody 200 - { "status": "OK", "data": { "token": "bearer token"} }
   * @responseBody 400 - { "errors": [{ "message": "erro"}] }
   */
  async store({ request, response }: HttpContext) {
    const { login, password } = request.only(['login', 'password'])

    await createSessionValidator.validate(request.all())

    const user = await User.verifyCredentials(login, password)
    const token = await User.accessTokens.create(user)

    return response.status(200).json({ data: token })
  }
}
