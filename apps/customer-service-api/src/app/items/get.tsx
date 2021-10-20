import type { Handler } from '@rester/core';
import { ExceptionHandler, SchemaHandler } from '@rester/handlers';
import { Url, usePrisma, useUrl } from '@rester/hooks';
import { Route } from '@rester/serverless';
import { Http400Exception, Http404Exception } from '@rester/utils';
import { NumberValidation } from '../validators';
import { itemSchema } from './common';

const validate = (url: Url) => {
  const id = new NumberValidation(url.variables.id);
  if (id.isInvalid() || id.isNotInteger() || id.isNotLargerThan(0)) {
    throw new Http400Exception('Path variable \'id\' must be a integer > 0');
  }
  return { id: id.value };
};

export const ItemGetHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <SchemaHandler schema={itemSchema}>
      <ItemGet {...validate(url)} />
    </SchemaHandler>;
  };

const ItemGet: Handler<{ id: number; }> =
  async ({ id }, { useContext }) => {
    const { database } = await usePrisma(useContext);
    const found = await database.item.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
    if (!found) {
      throw new Http404Exception(`item '#${id}' not found`);
    }
    return found;
  };

export const itemGetRoute: Route = {
  location: {
    method: 'get',
    path: '/items/:id',
  },
  handler: () => <ExceptionHandler>
    <ItemGetHandler />
  </ExceptionHandler>,
};

export default itemGetRoute;
