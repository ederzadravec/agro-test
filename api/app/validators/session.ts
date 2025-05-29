import vine from '@vinejs/vine'

export const createSessionValidator = vine.compile(
  vine.object({
    login: vine.string().trim(),
    password: vine.string().trim(),
  })
)
