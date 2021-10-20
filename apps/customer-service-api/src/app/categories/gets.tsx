import type { Handler } from '@rester/core';
import { ExceptionHandler, SchemaHandler } from '@rester/handlers';
import { Url, usePrisma, useUrl } from '@rester/hooks';
import { Route } from '@rester/serverless';
import { Http400Exception } from '@rester/utils';
import { BooleanValidation, NumberValidation } from '../validators';
import { categoriesSchema } from './common';

const validate = (url: Url) => {
  const count = new NumberValidation(url.query.count || 10);
  const items = new BooleanValidation(url.query.items);
  if (count.isExisted() && (count.isInvalid() || count.isNotInteger() || count.isNotLargerOrEqualThan(1))) {
    throw new Http400Exception('Query parameter \'count\' must be a integer >= 1');
  }
  return { count: count.value, items: items.value };
};

export const CategoriesGetHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <SchemaHandler schema={categoriesSchema}>
      <CategoriesGet {...validate(url)} />
    </SchemaHandler>;
  };

const CategoriesGet: Handler<{ count: number; items: boolean; }> =
  async ({ count, items }, { useContext }) => {
    const { database } = await usePrisma(useContext);
    return database.category.findMany({
      take: count,
      include: {
        items,
      },
    });
  };

export const categoriesGetRoute: Route = {
  location: {
    method: 'get',
    path: '/categories',
  },
  handler: () => <ExceptionHandler>
    <CategoriesGetHandler />
  </ExceptionHandler>,
};

export default categoriesGetRoute;
