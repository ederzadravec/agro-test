import type { HttpContext } from '@adonisjs/core/http'
import Harvest from '#models/harvest'
import {
  indexHarvestValidator,
  createHarvestValidator,
  updateHarvestValidator,
} from '#validators/harvest'

export default class HarvestController {
  async index({ request }: HttpContext) {
    const query = await indexHarvestValidator.validate(request.all())

    const operation = Harvest.query()

    if (query.farm) operation.where('farm_id', query.farm)

    return await operation
      .orderBy('name', 'asc')
      .preload('productor')
      .preload('farm')
      .paginate(query.page || 1, query.limit || 10)
  }

  async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createHarvestValidator.validate(data)

    await Harvest.create({
      name: payload.name,
      productor_id: payload.productor,
      farm_id: payload.farm,
    })

    return response.status(200)
  }

  async show({ params }: HttpContext) {
    return Harvest.query().preload('productor').preload('farm').where('id', params.id).first()
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await updateHarvestValidator.validate(data, { meta: { id: params.id } })

    const harvest = await Harvest.findOrFail(params.id)

    if (!harvest) {
      return response.status(400)
    }

    harvest.name = payload.name
    harvest.productor_id = payload.productor
    harvest.farm_id = payload.farm

    await harvest?.save()
  }

  async destroy({ params, response }: HttpContext) {
    const harvest = await Harvest.findOrFail(params.id)

    if (!harvest) {
      return response.status(400)
    }

    await harvest.delete()
  }
}
