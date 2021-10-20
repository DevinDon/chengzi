import type { Handler } from '@rester/core';
import { ExceptionHandler, SchemaHandler } from '@rester/handlers';
import { Url, useJsonRequestBody, usePrisma, useUrl } from '@rester/hooks';
import { Route } from '@rester/serverless';
import { Http400Exception, Http404Exception } from '@rester/utils';
import { Static, Type } from '@sinclair/typebox';
import { NumberValidation } from '../validators';

const requestSchema = Type.Object({
  deleteItems: Type.Boolean(),
});

const responseSchema = Type.Object({
  affectedItems: Type.Number({ minimum: 0 }),
});

const validate = (url: Url) => {
  const id = new NumberValidation(url.variables.id);
  if (id.isInvalid() || id.isNotInteger() || id.isNotLargerThan(0)) {
    throw new Http400Exception('Path variable \'id\' must be a integer > 0');
  }
  return { id: id.value };
};

export const CategoryDeleteHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    const { body } = await useJsonRequestBody(useContext, requestSchema);
    return <SchemaHandler schema={responseSchema}>
      <CategoryDelete {...validate(url)} data={body} />
    </SchemaHandler>;
  };

const CategoryDelete: Handler<{ id: number; data: Static<typeof requestSchema>; }> =
  async ({ id, data: { deleteItems } }, { useContext }) => {
    const { database } = await usePrisma(useContext);
    const { count: affectedItems } = deleteItems
      ? await database.item.deleteMany({
        where: { categoryId: id },
      })
      : await database.item.updateMany({
        where: { categoryId: id },
        data: { categoryId: null },
      });
    const deleted = await database.category.delete({
      where: { id },
    });
    if (!deleted) {
      throw new Http404Exception(`category '#${id}' not found`);
    }
    return { affectedItems };
  };

export const categoryDeleteRoute: Route = {
  location: {
    method: 'delete',
    path: '/categories/:id',
  },
  handler: () => <ExceptionHandler>
    <CategoryDeleteHandler />
  </ExceptionHandler>,
};

export default categoryDeleteRoute;
