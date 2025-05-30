import type { HttpContext } from '@adonisjs/core/http'
import Farm from '#models/farm'
import { indexFarmValidator, createFarmValidator, updateFarmValidator } from '#validators/farm'

export default class FarmController {
  /**
   * @index
   * @description Retorna as fazendas
   * @paramUse(sortable)
   * @responseBody 200 - <Farm[]>.with(relations).paginated(data, meta)
   */
  async index({ request }: HttpContext) {
    const query = await indexFarmValidator.validate(request.all())

    const operation = Farm.query()

    if (query.productor) operation.where('productor_id', query.productor)

    return await operation
      .orderBy('name', 'asc')
      .preload('productor')
      .preload('state')
      .paginate(query.page || 1, query.limit || 10)
  }

  /**
   * @store
   * @description Cria uma fazenda
   * @requestBody <Farm>.exclude(id, created_at, updated_at)
   * @responseBody 200 - { status: "OK" }
   * @responseBody 400 - { status: "ERROR" }
   */
  async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createFarmValidator.validate(data)

    try {
      await Farm.create({
        name: payload.name,
        productor_id: payload.productor,
        state_id: payload.state,
        city: payload.city,
        total_area: payload.totalArea,
        vegetation_area: payload.vegetationArea,
        areable_area: payload.areableArea,
      })

      return response.status(200).json({ status: 'OK' })
    } catch {
      return response.status(400).json({ status: 'ERROR' })
    }
  }

  /**
   * @show
   * @description Retorna uma fazenda
   * @paramPath id - id da fazenda - @type(string) @required
   * @responseBody 200 - <Farm>
   */
  async show({ params }: HttpContext) {
    return Farm.query().preload('productor').preload('state').where('id', params.id).first()
  }

  /**
   * @update
   * @description Altera uma fazenda
   * @paramPath id - id da fazenda - @type(string) @required
   * @requestBody <Farm>.exclude(id, created_at, updated_at)
   * @responseBody 200 - { status: "OK" }
   * @responseBody 400 - { status: "ERROR" }
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await updateFarmValidator.validate(data, { meta: { id: params.id } })

    const farm = await Farm.findOrFail(params.id)

    try {
      if (!farm) {
        return response.status(400)
      }

      farm.name = payload.name
      farm.productor_id = payload.productor
      farm.state_id = payload.state
      farm.city = payload.city
      farm.total_area = payload.totalArea
      farm.vegetation_area = payload.vegetationArea
      farm.areable_area = payload.areableArea

      await farm?.save()
      return response.status(200).json({ status: 'OK' })
    } catch {
      return response.status(400).json({ status: 'ERROR' })
    }
  }

  /**
   * @destroy
   * @description Remove uma fazenda
   * @responseBody 200 - { status: "OK" }
   * @responseBody 400 - { status: "ERROR" }
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const farm = await Farm.findOrFail(params.id)

      if (!farm) {
        return response.status(400).json({ status: 'ERROR' })
      }

      await farm.delete()
      return response.status(200).json({ status: 'OK' })
    } catch {
      return response.status(400).json({ status: 'ERROR' })
    }
  }
}
