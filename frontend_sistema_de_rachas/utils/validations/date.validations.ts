import zod from 'zod';

export const DaysOfWeekSchema = zod.enum([
  'segunda',
  'terca',
  'terça',
  'quarta',
  'quinta',
  'sexta',
  'sabado',
  'sábado',
  'domingo',
]);

export const DaysOfWeekListSchema = zod
  .string({ message: "É preciso informar os dias disponíveis do campo."})
  .transform((str: string) => {
    return str.split(',').map((dia) => dia.trim());
  })
  .refine(
    (dias) => dias.every((dia) => DaysOfWeekSchema.safeParse(dia).success),
    {
      message:
        'A lista deve conter apenas dias da semana válidos e sem acentos.',
    }
  );
