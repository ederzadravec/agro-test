import { DateTime } from 'luxon'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, hasMany, hasOne } from '@adonisjs/lucid/orm'

import Harvest from './harvest.js'
import Productor from './productor.js'
import InfoState from './info_state.js'

export default class Farm extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productor_id: number

  @column()
  declare name: string

  @column()
  declare city: string

  @column()
  declare state_id: number

  @column()
  declare totalArea: number

  @column()
  declare areableArea: number

  @column()
  declare vegetationArea: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Harvest)
  declare harvests: HasMany<typeof Harvest>

  @hasOne(() => Productor, {
    foreignKey: 'id',
    localKey: 'productor_id',
    onQuery: (query) => query.select('id', 'name'),
  })
  declare productor: HasOne<typeof Productor>

  @hasOne(() => InfoState, {
    foreignKey: 'id',
    localKey: 'state_id',
    onQuery: (query) => query.select('id', 'name', 'uf'),
  })
  declare state: HasOne<typeof InfoState>
}
