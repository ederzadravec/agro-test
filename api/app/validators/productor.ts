import vine from '@vinejs/vine'

export const indexProductorValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
  })
)

export const createProductorValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(6),
    cnpj: vine.string().trim().minLength(14).unique({ table: 'productors', column: 'cnpj' }),
  })
)

export const updateProductorValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(6),
    cnpj: vine
      .string()
      .trim()
      .minLength(14)
      .unique({
        table: 'productors',
        column: 'cnpj',
        filter: (db, value, field) => {
          db.whereNot('id', field.meta.id)
        },
      }),
  })
)
