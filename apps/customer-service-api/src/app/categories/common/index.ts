import { Type } from '@sinclair/typebox';

export type { Category } from '@prisma/client';

export const categorySchema = Type.Object({
  id: Type.Integer({ minimum: 1 }),
  name: Type.String({ maxLength: 10 }),
  createdAt: Type.Any(),
  updatedAt: Type.Any(),
  items: Type.Optional(
    Type.Array(
      Type.Object({
        id: Type.Integer({ minimum: 1 }),
        createdAt: Type.Any(),
        updatedAt: Type.Any(),
        frequency: Type.Integer({ minimum: 0 }),
        content: Type.String({ maxLength: 1024 }),
        categoryId: Type.Integer({ minimum: 1 }),
      }),
    ),
  ),
});

export const categoriesSchema = Type.Array(categorySchema);
