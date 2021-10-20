import type { Handler } from '@rester/core';
import { ExceptionHandler, SchemaHandler } from '@rester/handlers';
import { useJsonRequestBody, usePrisma } from '@rester/hooks';
import { Route } from '@rester/serverless';
import { Http400Exception } from '@rester/utils';
import { Type } from '@sinclair/typebox';
import { itemSchema } from './common';

const requestSchema = Type.Object({
  content: Type.String({ maxLength: 1024 }),
  categoryId: Type.Union([
    Type.Optional(Type.Number({ minimum: 1 })),
    Type.Null(),
  ]),
});

export const ItemPostHandler: Handler =
  async (_, { useContext }) => {
    const { database } = await usePrisma(useContext);
    const { body } = await useJsonRequestBody(useContext, requestSchema);
    const createable = !!(
      body.categoryId === undefined
      || body.categoryId === null
      || await database.category.findFirst({ where: { id: body.categoryId } })
    );
    if (!createable) {
      throw new Http400Exception(`category '#${body.categoryId}' not found, you should create category first`);
    }
    const created = await database.item.create({ data: body });
    return <SchemaHandler schema={itemSchema}>{created}</SchemaHandler>;
  };

export const itemPostRoute: Route = {
  location: {
    method: 'post',
    path: '/items',
  },
  handler: () => <ExceptionHandler>
    <ItemPostHandler />
  </ExceptionHandler>,
};

export default itemPostRoute;
