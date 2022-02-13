import Joi from 'joi';

//NOTAS. Acerca de las validaciones.
//Hay que pasar esquemas separados para cada campo, porque por ALGUN motivo joi
//no envía más de 1 error, en caso de haber más de 1 error, sólo envía el primero que encuentra.

export const schemaCompleteName = Joi.object({
    username: Joi.string()
        .min(3)
        .max(100)
        .empty()
        .messages({
            "string.base": "Debe ser un string",
            "string.min": "Debe contener mínimo 3 caracteres",
            "string.max": "Debe contener máximo 100 caracteres",
            "string.empty": "Este campo es obligatorio"
        })
})

export const schemaEmail = Joi.object({
    email: Joi.string()
        .email({ tlds: {allow: false} })
        .empty()
        .messages({
            "string.base": "Debe ser un string",
            "string.email": "El formato no es válido",
            "string.empty": "Este campo es obligatorio",
        })
    })
        
export const schemaPhone = Joi.object({
    phone: Joi.string()
        .pattern(new RegExp('^[0-9]{10}'))
        .messages({
            "string.pattern.base": "El teléfono debe tener 10 dígitos"
        })
})