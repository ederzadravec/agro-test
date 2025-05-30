import type { HttpContext } from '@adonisjs/core/http'
import Productor from '#models/productor'
import {
  indexProductorValidator,
  createProductorValidator,
  updateProductorValidator,
} from '#validators/productor'

export default class ProductorController {
  /**
   * @index
   * @description Retorna os produtores
   * @paramUse(sortable)
   * @responseBody 200 - <Productor[]>.with(relations).paginated(data, meta)
   */
  async index({ request }: HttpContext) {
    const query = await indexProductorValidator.validate(request.all())

    return await Productor.query()
      .orderBy('name', 'asc')
      .paginate(query.page || 1, query.limit || 10)
  }

  /**
   * @store
   * @description Cria um produtor
   * @requestBody <Productor>.exclude(id, created_at, updated_at)
   * @responseBody 200 - { status: "OK" }
   * @responseBody 400 - { status: "ERROR" }
   */
  async store({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createProductorValidator.validate(data)

    try {
      await Productor.create({
        name: payload.name,
        cnpj: payload.cnpj,
      })
      return response.status(200).json({ status: 'OK' })
    } catch {
      return response.status(400).json({ status: 'ERROR' })
    }
  }

  /**
   * @show
   * @description Retorna um produtor
   * @paramPath id - id do produtor - @type(string) @required
   * @responseBody 200 - <Productor>
   */
  async show({ params }: HttpContext) {
    return Productor.find(params.id)
  }

  /**
   * @update
   * @description Altera um produtor
   * @paramPath id - id do produtor - @type(string) @required
   * @requestBody <Productor>.exclude(id, created_at, updated_at)
   * @responseBody 200 - { status: "OK" }
   * @responseBody 400 - { status: "ERROR" }
   */
  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await updateProductorValidator.validate(data, { meta: { id: params.id } })

    const productor = await Productor.findOrFail(params.id)

    try {
      if (!productor) {
        return response.status(400).json({ status: 'ERROR' })
      }

      productor.name = payload.name
      productor.cnpj = payload.cnpj

      await productor?.save()
      return response.status(200).json({ status: 'OK' })
    } catch {
      return response.status(400).json({ status: 'ERROR' })
    }
  }

  /**
   * @destroy
   * @description Remove um produtor
   * @responseBody 200 - { status: "OK" }
   * @responseBody 400 - { status: "ERROR" }
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const productor = await Productor.findOrFail(params.id)

      if (!productor) {
        return response.status(400).json({ status: 'ERROR' })
      }

      await productor.delete()
      return response.status(200).json({ status: 'OK' })
    } catch {
      return response.status(400).json({ status: 'ERROR' })
    }
  }
}
