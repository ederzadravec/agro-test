import type { HttpContext } from '@adonisjs/core/http'

import Farm from '#models/farm'
import CultivatedPlant from '#models/cultivated_plant'

export default class DashboardController {
  async total({}: HttpContext) {
    const result = await Farm.query()
      .sum('total_area as total_area_sum')
      .sum('areable_area as areable_area_sum')
      .sum('vegetation_area as vegetation_area_sum')
      .count('* as farms')
      .first()

    return {
      farms: Number.parseInt(result?.$extras?.farms || '0'),
      total_area_sum: Number.parseInt(result?.$extras?.total_area_sum || '0'),
      areable_area_sum: Number.parseInt(result?.$extras?.areable_area_sum || '0'),
      vegetation_area_sum: Number.parseInt(result?.$extras?.vegetation_area_sum || '0'),
    }
  }

  async byState({}: HttpContext) {
    const result = await Farm.query()
      .groupBy('state_id')
      .count('* as farms')
      .select('state_id')
      .preload('state')

    return result.map((item) => ({
      state: item.state,
      total: Number.parseInt(item?.$extras?.farms || '0'),
    }))
  }

  async byCultivatedPlant({}: HttpContext) {
    const result = await CultivatedPlant.query().groupBy('name').count('* as total').select('name')

    return result.map((item) => ({
      name: item.name,
      total: Number.parseInt(item?.$extras?.total || '0', 10),
    }))
  }
}
