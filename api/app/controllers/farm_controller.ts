import type { HttpContext } from '@adonisjs/core/http'
import Farm from '#models/farm'
import { indexFarmValidator, createFarmValidator, updateFarmValidator } from '#validators/farm'

export default class FarmController {
  async index({ request }: HttpContext) {
    const query = await indexFarmValidator.validate(request.all())

    return await Farm.query()
      .orderBy('name', 'asc')
      .preload('productor')
      .preload('state')
      .paginate(query.page || 1, query.limit || 10)
  }

  async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createFarmValidator.validate(data)

    await Farm.create({
      name: payload.name,
      productor_id: payload.productor,
      state_id: payload.state,
      city: payload.city,
      totalArea: payload.totalArea,
      vegetationArea: payload.vegetationArea,
      areableArea: payload.areableArea,
    })

    return response.status(200)
  }

  async show({ params }: HttpContext) {
    return Farm.query().preload('productor').preload('state').where('id', params.id).first()
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await updateFarmValidator.validate(data, { meta: { id: params.id } })

    const farm = await Farm.findOrFail(params.id)

    if (!farm) {
      return response.status(400)
    }

    farm.name = payload.name
    farm.productor_id = payload.productor
    farm.state_id = payload.state
    farm.city = payload.city
    farm.totalArea = payload.totalArea
    farm.vegetationArea = payload.vegetationArea
    farm.areableArea = payload.areableArea

    await farm?.save()
  }

  async destroy({ params, response }: HttpContext) {
    const farm = await Farm.findOrFail(params.id)

    if (!farm) {
      return response.status(400)
    }

    await farm.delete()
  }
}
