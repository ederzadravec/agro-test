import { DateTime } from 'luxon'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, hasMany, hasOne } from '@adonisjs/lucid/orm'

import CultivatedPlant from './cultivated_plant.js'
import Farm from './farm.js'
import Productor from './productor.js'

export default class Harvest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productor_id: number

  @column()
  declare farm_id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => CultivatedPlant)
  declare cultivatedPlants: HasMany<typeof CultivatedPlant>

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
}
