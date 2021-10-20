import { Type } from '@sinclair/typebox';

export const itemSchema = Type.Object({
  id: Type.Integer({ minimum: 1 }),
  createdAt: Type.Any(),
  updatedAt: Type.Any(),
  frequency: Type.Integer({ minimum: 0 }),
  content: Type.String({ maxLength: 1024 }),
  categoryId: Type.Union([
    Type.Integer({ minimum: 1 }),
    Type.Null(),
  ]),
  category: Type.Optional(
    Type.Union([
      Type.Object({
        id: Type.Integer({ minimum: 1 }),
        name: Type.String({ maxLength: 10 }),
        createdAt: Type.Any(),
        updatedAt: Type.Any(),
      }),
      Type.Null(),
    ]),
  ),
});
