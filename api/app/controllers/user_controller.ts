import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Return list of all posts or paginate through
   * them
   */
  async index({}: HttpContext) {
    return await User.all()
  }
}
