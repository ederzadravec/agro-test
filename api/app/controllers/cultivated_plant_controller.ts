import type { HttpContext } from '@adonisjs/core/http'
import CultivatedPlant from '#models/cultivated_plant'
import {
  indexCultivatedPlantValidator,
  createCultivatedPlantValidator,
  updateCultivatedPlantValidator,
} from '#validators/cultivated_plant'

export default class CultivatedPlantController {
  /**
   * @index
   * @description Retorna as culturas plantadas
   * @paramUse(sortable)
   * @responseBody 200 - <CultivatedPlant[]>.with(relations).paginated(data, meta)
   */
  async index({ request }: HttpContext) {
    const query = await indexCultivatedPlantValidator.validate(request.all())

    return await CultivatedPlant.query()
      .orderBy('name', 'asc')
      .preload('productor')
      .preload('farm')
      .preload('harvest')
      .paginate(query.page || 1, query.limit || 10)
  }

  /**
   * @store
   * @description Cria uma cultura plantada
   * @requestBody <CultivatedPlant>.exclude(id, created_at, updated_at)
   * @responseBody 200 - { status: "OK" }
   * @responseBody 400 - { status: "ERROR" }
   */
  async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createCultivatedPlantValidator.validate(data)

    try {
      await CultivatedPlant.create({
        name: payload.name,
        productor_id: payload.productor,
        farm_id: payload.farm,
        harvest_id: payload.harvest,
      })

      return response.status(200).json({ status: 'OK' })
    } catch {
      return response.status(400).json({ status: 'ERROR' })
    }
  }

  /**
   * @show
   * @description Retorna uma cultura plantada
   * @paramPath id - id da cultura plantada - @type(string) @required
   * @responseBody 200 - <CultivatedPlant>
   */
  async show({ params }: HttpContext) {
    return CultivatedPlant.query()
      .preload('productor')
      .preload('farm')
      .preload('harvest')
      .where('id', params.id)
      .first()
  }

  /**
   * @update
   * @description Altera uma cultura plantada
   * @paramPath id - id da cultura plantada - @type(string) @required
   * @requestBody <CultivatedPlant>.exclude(id, created_at, updated_at)
   * @responseBody 200 - { status: "OK" }
   * @responseBody 400 - { status: "ERROR" }
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await updateCultivatedPlantValidator.validate(data, {
      meta: { id: params.id },
    })

    const cultivatedPlant = await CultivatedPlant.findOrFail(params.id)

    try {
      if (!cultivatedPlant) {
        return response.status(400).json({ status: 'ERROR' })
      }

      cultivatedPlant.name = payload.name
      cultivatedPlant.productor_id = payload.productor
      cultivatedPlant.farm_id = payload.farm
      cultivatedPlant.harvest_id = payload.harvest

      await cultivatedPlant?.save()

      return response.status(200).json({ status: 'OK' })
    } catch {
      return response.status(400).json({ status: 'ERROR' })
    }
  }

  /**
   * @destroy
   * @description Remove uma cultura plantada
   * @responseBody 200 - { status: "OK" }
   * @responseBody 400 - { status: "ERROR" }
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const cultivatedPlant = await CultivatedPlant.findOrFail(params.id)

      if (!cultivatedPlant) {
        return response.status(400).json({ status: 'ERROR' })
      }

      await cultivatedPlant.delete()

      return response.status(200).json({ status: 'OK' })
    } catch {
      return response.status(400).json({ status: 'ERROR' })
    }
  }
}
