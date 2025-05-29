import vine from '@vinejs/vine'

import { totalAreaRule } from './rules/farm_total_area_rule.js'

export const indexFarmValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
  })
)

export const createFarmValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    productor: vine.number(),
    city: vine.string().trim(),
    state: vine.number(),
    totalArea: vine.number().use(totalAreaRule()),
    areableArea: vine.number(),
    vegetationArea: vine.number(),
  })
)

export const updateFarmValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    productor: vine.number(),
    city: vine.string().trim(),
    state: vine.number(),
    totalArea: vine.number(),
    areableArea: vine.number(),
    vegetationArea: vine.number(),
  })
)
