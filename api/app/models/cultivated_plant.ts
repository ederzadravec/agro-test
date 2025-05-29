import { DateTime } from 'luxon'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'

import Harvest from './harvest.js'
import Farm from './farm.js'
import Productor from './productor.js'

export default class CultivatedPlant extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare productor_id: number

  @column()
  declare farm_id: number

  @column()
  declare harvest_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Farm, {
    foreignKey: 'id',
    localKey: 'farm_id',
    onQuery: (query) => query.select('id', 'name'),
  })
  declare farm: HasOne<typeof Farm>

  @hasOne(() => Productor, {
    foreignKey: 'id',
    localKey: 'productor_id',
    onQuery: (query) => query.select('id', 'name'),
  })
  declare productor: HasOne<typeof Productor>

  @hasOne(() => Harvest, {
    foreignKey: 'id',
    localKey: 'productor_id',
    onQuery: (query) => query.select('id', 'name'),
  })
  declare harvest: HasOne<typeof Harvest>
}
