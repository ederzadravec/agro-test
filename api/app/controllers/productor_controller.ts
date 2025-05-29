import type { HttpContext } from '@adonisjs/core/http'
import Productor from '#models/productor'
import {
  indexProductorValidator,
  createProductorValidator,
  updateProductorValidator,
} from '#validators/productor'

export default class ProductorController {
  async index({ request }: HttpContext) {
    const query = await indexProductorValidator.validate(request.all())

    return await Productor.query()
      .orderBy('name', 'asc')
      .paginate(query.page || 1, query.limit || 10)
  }

  async store({ request }: HttpContext) {
    const data = request.all()
    const payload = await createProductorValidator.validate(data)

    await Productor.create({
      name: payload.name,
      cnpj: payload.cnpj,
    })
  }

  async show({ params }: HttpContext) {
    return Productor.find(params.id)
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await updateProductorValidator.validate(data, { meta: { id: params.id } })

    const productor = await Productor.findOrFail(params.id)

    if (!productor) {
      return response.status(400)
    }

    productor.name = payload.name
    productor.cnpj = payload.cnpj

    await productor?.save()
  }

  async destroy({ params, response }: HttpContext) {
    const productor = await Productor.findOrFail(params.id)

    if (!productor) {
      return response.status(400)
    }

    await productor.delete()
  }
}
