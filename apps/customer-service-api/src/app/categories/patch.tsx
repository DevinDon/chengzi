import type { Handler } from '@rester/core';
import { ExceptionHandler, SchemaHandler } from '@rester/handlers';
import { Url, useJsonRequestBody, usePrisma, useUrl } from '@rester/hooks';
import { Route } from '@rester/serverless';
import { Http400Exception, Http404Exception } from '@rester/utils';
import { Static, Type } from '@sinclair/typebox';
import { NumberValidation } from '../validators';
import { categorySchema } from './common';

const requestSchema = Type.Object({
  name: Type.String({ maxLength: 10 }),
});

const validate = (url: Url) => {
  const id = new NumberValidation(url.variables.id);
  if (id.isInvalid() || id.isNotInteger() || id.isNotLargerThan(0)) {
    throw new Http400Exception('Path variable \'id\' must be a integer > 0');
  }
  return { id: id.value };
};

export const CategoryPatchHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    const { body } = await useJsonRequestBody(useContext, requestSchema);
    return <SchemaHandler schema={categorySchema}>
      <CategoryPatch {...validate(url)} data={body} />
    </SchemaHandler>;
  };

const CategoryPatch: Handler<{ id: number; data: Static<typeof requestSchema>; }> =
  async ({ id, data }, { useContext }) => {
    const { database } = await usePrisma(useContext);
    const patched = await database.category.update({
      where: { id },
      data,
    });
    if (!patched) {
      throw new Http404Exception(`category '#${id}' not found`);
    }
    return patched;
  };

export const categoryPatchRoute: Route = {
  location: {
    method: 'patch',
    path: '/categories/:id',
  },
  handler: () => <ExceptionHandler>
    <CategoryPatchHandler />
  </ExceptionHandler>,
};

export default categoryPatchRoute;
