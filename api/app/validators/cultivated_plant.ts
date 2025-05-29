import vine from '@vinejs/vine'

export const indexCultivatedPlantValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
  })
)

export const createCultivatedPlantValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    productor: vine.number(),
    farm: vine.number(),
    harvest: vine.number(),
  })
)

export const updateCultivatedPlantValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    productor: vine.number(),
    farm: vine.number(),
    harvest: vine.number(),
  })
)
