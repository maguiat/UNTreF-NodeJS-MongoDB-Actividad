const { z } = require('zod')

const frutaSchema = z.object({
  nombre: z.string().min(3, 'nombre must be at least 3 characters'),
  precio: z.number().int().positive('el precio debe ser mayor que cero.'),
  imagen: z.string().optional()
})

const validarFruta = (fruta) => {
  return frutaSchema.safeParse(fruta)
}

const validarFrutaParcialmente = (fruta) => {
  return frutaSchema.partial().safeParse(fruta)
}

module.exports = {
  validarFruta,
  validarFrutaParcialmente
}