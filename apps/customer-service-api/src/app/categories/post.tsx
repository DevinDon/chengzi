import type { Handler } from '@rester/core';
import { ExceptionHandler, SchemaHandler } from '@rester/handlers';
import { useJsonRequestBody, usePrisma } from '@rester/hooks';
import { Route } from '@rester/serverless';
import { Type } from '@sinclair/typebox';
import { categorySchema } from './common';

export const requestSchema = Type.Object({
  name: Type.String({ maxLength: 1024 }),
});

export const CategoryPostHandler: Handler =
  async (_, { useContext }) => {
    const { body } = await useJsonRequestBody(useContext, requestSchema);
    const { database } = await usePrisma(useContext);
    const created = await database.category.create({ data: body });
    return <SchemaHandler schema={categorySchema}>{created}</SchemaHandler>;
  };

export const categoryPostRoute: Route = {
  location: {
    method: 'post',
    path: '/categories',
  },
  handler: () => <ExceptionHandler>
    <CategoryPostHandler />
  </ExceptionHandler>,
};

export default categoryPostRoute;
