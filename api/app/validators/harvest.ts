import vine from '@vinejs/vine'

export const indexHarvestValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
    farm: vine.number().optional(),
  })
)

export const createHarvestValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    productor: vine.number(),
    farm: vine.number(),
  })
)

export const updateHarvestValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    productor: vine.number(),
    farm: vine.number(),
  })
)
