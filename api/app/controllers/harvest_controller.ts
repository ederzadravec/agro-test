import type { HttpContext } from '@adonisjs/core/http'
import Harvest from '#models/harvest'
import {
  indexHarvestValidator,
  createHarvestValidator,
  updateHarvestValidator,
} from '#validators/harvest'

export default class HarvestController {
  /**
   * @index
   * @description Retorna as culturas plantadas
   * @paramUse(sortable)
   * @responseBody 200 - <Harvest[]>.with(relations).paginated(data, meta)
   */

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

  /**
   * @store
   * @description Cria uma safra
   * @requestBody <Harvest>.exclude(id, created_at, updated_at)
   * @responseBody 200 - { status: "OK" }
   * @responseBody 400 - { status: "ERROR" }
   */
  async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createHarvestValidator.validate(data)

    try {
      await Harvest.create({
        name: payload.name,
        productor_id: payload.productor,
        farm_id: payload.farm,
      })

      return response.status(200).json({ status: 'OK' })
    } catch {
      return response.status(400).json({ status: 'ERROR' })
    }
  }

  /**
   * @show
   * @description Retorna uma safra
   * @paramPath id - id da safra - @type(string) @required
   * @responseBody 200 - <Harvest>
   */
  async show({ params }: HttpContext) {
    return Harvest.query().preload('productor').preload('farm').where('id', params.id).first()
  }

  /**
   * @update
   * @description Altera uma safra
   * @paramPath id - id da safra - @type(string) @required
   * @requestBody <Harvest>.exclude(id, created_at, updated_at)
   * @responseBody 200 - { status: "OK" }
   * @responseBody 400 - { status: "ERROR" }
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await updateHarvestValidator.validate(data, { meta: { id: params.id } })

    const harvest = await Harvest.findOrFail(params.id)

    try {
      if (!harvest) {
        return response.status(400).json({ status: 'ERROR' })
      }

      harvest.name = payload.name
      harvest.productor_id = payload.productor
      harvest.farm_id = payload.farm

      await harvest?.save()
      return response.status(200).json({ status: 'OK' })
    } catch {
      return response.status(400).json({ status: 'ERROR' })
    }
  }

  /**
   * @destroy
   * @description Remove uma safra
   * @responseBody 200 - { status: "OK" }
   * @responseBody 400 - { status: "ERROR" }
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const harvest = await Harvest.findOrFail(params.id)

      if (!harvest) {
        return response.status(400).json({ status: 'ERROR' })
      }

      await harvest.delete()
      return response.status(200).json({ status: 'OK' })
    } catch {
      return response.status(400).json({ status: 'ERROR' })
    }
  }
}
