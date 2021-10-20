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

export const ItemDeleteHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <SchemaHandler schema={itemSchema}>
      <ItemDelete {...validate(url)} />
    </SchemaHandler>;
  };

const ItemDelete: Handler<{ id: number; }> =
  async ({ id }, { useContext }) => {
    const { database } = await usePrisma(useContext);
    const deleted = await database.item.delete({
      where: { id },
    });
    if (!deleted) {
      throw new Http404Exception(`item '#${id}' not found`);
    }
    return deleted;
  };

export const itemDeleteRoute: Route = {
  location: {
    method: 'delete',
    path: '/items/:id',
  },
  handler: () => <ExceptionHandler>
    <ItemDeleteHandler />
  </ExceptionHandler>,
};

export default itemDeleteRoute;
