import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

async function totalArea(value: unknown, options, field: FieldContext) {
  if (typeof value !== 'number') {
    return
  }

  const sumAreas = (field.data?.areableArea || 0) + (field.data?.vegetationArea || 0)

  if (value < sumAreas) {
    field.report('The {{ field }} is less than the sum of the areas', 'totalArea', field)
  }
}

export const totalAreaRule = vine.createRule<any>(totalArea)
