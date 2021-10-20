import type { Handler } from '@rester/core';
import { ExceptionHandler, SchemaHandler } from '@rester/handlers';
import { Url, usePrisma, useUrl } from '@rester/hooks';
import { Route } from '@rester/serverless';
import { Http400Exception, Http404Exception } from '@rester/utils';
import { BooleanValidation, NumberValidation } from '../validators';
import { categorySchema } from './common';

const validate = (url: Url) => {
  const id = new NumberValidation(url.variables.id);
  const items = new BooleanValidation(url.query.items);
  if (id.isInvalid() || id.isNotInteger() || id.isNotLargerThan(0)) {
    throw new Http400Exception('Path variable \'id\' must be a integer > 0');
  }
  return { id: id.value, items: items.value };
};

export const CategoryGetHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <SchemaHandler schema={categorySchema}>
      <CategoryGet {...validate(url)} />
    </SchemaHandler>;
  };

const CategoryGet: Handler<{ id: number; items: boolean; }> =
  async ({ id, items }, { useContext }) => {
    const { database } = await usePrisma(useContext);
    const created = await database.category.findUnique({
      where: { id },
      include: {
        items,
      },
    });
    if (!created) {
      throw new Http404Exception(`category '#${id}' not found`);
    }
    return created;
  };

export const categoryGetRoute: Route = {
  location: {
    method: 'get',
    path: '/categories/:id',
  },
  handler: () => <ExceptionHandler>
    <CategoryGetHandler />
  </ExceptionHandler>,
};

export default categoryGetRoute;
