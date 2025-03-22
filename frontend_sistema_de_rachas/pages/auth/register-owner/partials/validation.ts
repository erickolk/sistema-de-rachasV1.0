import zod from 'zod';
import { UserRoleEnum } from 'sistema-rachas-domain/enums';

const validDDDs = [
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19', // São Paulo
  '21',
  '22',
  '24', // Rio de Janeiro
  '27',
  '28', // Espírito Santo
  '31',
  '32',
  '33',
  '34',
  '35',
  '37',
  '38', // Minas Gerais
  '41',
  '42',
  '43',
  '44',
  '45',
  '46', // Paraná
  '47',
  '48',
  '49', // Santa Catarina
  '51',
  '53',
  '54',
  '55', // Rio Grande do Sul
  '61', // Distrito Federal
  '62', // Goiás
  '63',
  '64', // Maranhão
  '65',
  '66', // Mato Grosso
  '67', // Mato Grosso do Sul
  '68', // Acre
  '69', // Rondônia
  '71',
  '73',
  '74',
  '75',
  '77', // Bahia
  '79', // Sergipe
  '81',
  '82', // Pernambuco
  '83', // Paraíba
  '84', // Rio Grande do Norte
  '85', // Ceará
  '86', // Piauí
  '87', // Alagoas
  '88', // Ceará
  '89', // Bahia
  '91',
  '92',
  '93',
  '94',
  '95',
  '96',
  '97',
  '98',
  '99', // Pará
];

export const registerUserSchema = zod.object({
  name: zod
    .string()
    .min(4, { message: 'O nome de usuário deve ter no mínimo 4 caracteres' })
    .nonempty({ message: 'O nome de usuário é obrigatório' }),
  email: zod
    .string()
    .email({ message: 'Deve ser um email válido' })
    .nonempty({ message: 'O email é obrigatório' }),
  password: zod
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .regex(/[a-z]/, {
      message: 'A senha deve conter pelo menos uma letra minúscula',
    })
    .regex(/[A-Z]/, {
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    })
    .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número' })
    .nonempty({ message: 'A senha é obrigatória' }),
  confirmPassword: zod
    .string()
    .min(8, {
      message: 'A confirmação de senha deve ter no mínimo 8 caracteres',
    })
    .nonempty({ message: 'A confirmação de senha é obrigatória' }),

  phone: zod
    .string()
    .regex(/^\d{2}\d{8,9}$/, {
      message: 'O telefone deve ter 10 ou 11 dígitos',
    })
    .refine((phone) => validDDDs.includes(phone.substring(0, 2)), {
      message: 'O DDD é inválido',
    }),
});
