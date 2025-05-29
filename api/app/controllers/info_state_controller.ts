import type { HttpContext } from '@adonisjs/core/http'

import InfoState from '#models/info_state'
import { indexInfoStateValidator } from '#validators/info_state'

export default class InfoStateController {
  async index({ request }: HttpContext) {
    const query = await indexInfoStateValidator.validate(request.all())

    return await InfoState.query()
      .orderBy('name', 'asc')
      .paginate(query.page || 1, query.limit || 10)
  }
}
