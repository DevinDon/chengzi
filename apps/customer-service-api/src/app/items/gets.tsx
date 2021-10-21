import type { Handler } from '@rester/core';
import { ExceptionHandler, SchemaHandler } from '@rester/handlers';
import { Url, usePrisma, useUrl } from '@rester/hooks';
import { Route } from '@rester/serverless';
import { Http400Exception, pureUndefined } from '@rester/utils';
import { NumberValidation } from '../validators';
import { itemsSchema } from './common';

const validate = (url: Url) => {
  const count = new NumberValidation(url.query.count);
  const categoryId = new NumberValidation(url.query.categoryId);
  if (count.isValid() && (count.isNotInteger() || count.isNotLargerThan(0))) {
    throw new Http400Exception('Items \'count\' must be an integer > 0');
  }
  if (categoryId.isValid() && (categoryId.isNotInteger() || categoryId.isNotLargerThan(0))) {
    throw new Http400Exception('Items \'categoryId\' must be an integer > 0');
  }
  return { count: count.value || undefined, categoryId: categoryId.value || undefined };
};

export const ItemsGetHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <SchemaHandler schema={itemsSchema}>
      <ItemsGet {...validate(url)} />
    </SchemaHandler>;
  };

const ItemsGet: Handler<{ count?: number; categoryId?: number; }> =
  async ({ count, categoryId }, { useContext }) => {
    const { database } = await usePrisma(useContext);
    return database.item.findMany({
      where: pureUndefined({
        categoryId,
      }),
      take: count,
      include: {
        category: true,
      },
    });
  };

export const itemsGetRoute: Route = {
  location: {
    method: 'get',
    path: '/items',
  },
  handler: () => <ExceptionHandler>
    <ItemsGetHandler />
  </ExceptionHandler>,
};

export default itemsGetRoute;
