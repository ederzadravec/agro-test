import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { createSessionValidator } from '#validators/session'

export default class SessionController {
  async store({ request }: HttpContext) {
    const { login, password } = request.only(['login', 'password'])

    await createSessionValidator.validate(request.all())

    const user = await User.verifyCredentials(login, password)
    const token = await User.accessTokens.create(user)

    return token
  }
}
