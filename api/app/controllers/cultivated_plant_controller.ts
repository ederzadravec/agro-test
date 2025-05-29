import type { HttpContext } from '@adonisjs/core/http'
import CultivatedPlant from '#models/cultivated_plant'
import {
  indexCultivatedPlantValidator,
  createCultivatedPlantValidator,
  updateCultivatedPlantValidator,
} from '#validators/cultivated_plant'

export default class CultivatedPlantController {
  async index({ request }: HttpContext) {
    const query = await indexCultivatedPlantValidator.validate(request.all())

    return await CultivatedPlant.query()
      .orderBy('name', 'asc')
      .preload('productor')
      .preload('farm')
      .preload('harvest')
      .paginate(query.page || 1, query.limit || 10)
  }

  async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createCultivatedPlantValidator.validate(data)

    await CultivatedPlant.create({
      name: payload.name,
      productor_id: payload.productor,
      farm_id: payload.farm,
      harvest_id: payload.harvest,
    })

    return response.status(200)
  }

  async show({ params }: HttpContext) {
    return CultivatedPlant.query()
      .preload('productor')
      .preload('farm')
      .preload('harvest')
      .where('id', params.id)
      .first()
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await updateCultivatedPlantValidator.validate(data, { meta: { id: params.id } })

    const cultivatedPlant = await CultivatedPlant.findOrFail(params.id)

    if (!cultivatedPlant) {
      return response.status(400)
    }

    cultivatedPlant.name = payload.name
    cultivatedPlant.productor_id = payload.productor
    cultivatedPlant.farm_id = payload.farm
    cultivatedPlant.harvest_id = payload.harvest

    await cultivatedPlant?.save()
  }

  async destroy({ params, response }: HttpContext) {
    const cultivatedPlant = await CultivatedPlant.findOrFail(params.id)

    if (!cultivatedPlant) {
      return response.status(400)
    }

    await cultivatedPlant.delete()
  }
}
