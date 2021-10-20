import type { Handler } from '@rester/core';
import { ExceptionHandler, SchemaHandler } from '@rester/handlers';
import { Url, useJsonRequestBody, usePrisma, useUrl } from '@rester/hooks';
import { Route } from '@rester/serverless';
import { Http400Exception, Http404Exception } from '@rester/utils';
import { Static, Type } from '@sinclair/typebox';
import { NumberValidation, StringValidation } from '../validators';
import { itemSchema } from './common';

const requestSchema = Type.Object({
  content: Type.Optional(Type.String({ maxLength: 1024 })),
  categoryId: Type.Optional(
    Type.Union([
      Type.Number({ minimum: 1 }),
      Type.Null(),
    ]),
  ),
});

const validate = (url: Url) => {
  const id = new NumberValidation(url.variables.id);
  const action = new StringValidation(url.query.action);
  if (id.isInvalid() || id.isNotInteger() || id.isNotLargerThan(0)) {
    throw new Http400Exception('Path variable \'id\' must be a integer > 0');
  }
  if (action.isExisted() && action.isNot(input => ['increase'].includes(input))) {
    throw new Http400Exception('Query parameter \'action\' must be one of \'[increase]\'');
  }
  return { id: id.value, action: action.value };
};

export const ItemPatchHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    const { body } = await useJsonRequestBody(useContext, requestSchema);
    return <SchemaHandler schema={itemSchema}>
      <ItemPatch {...validate(url)} data={body} />
    </SchemaHandler>;
  };

const ItemPatch: Handler<{ id: number; action: string; data: Static<typeof requestSchema>; }> =
  async ({ id, action, data }, { useContext }) => {
    const { database } = await usePrisma(useContext);
    const itemFound = !!await database.item.findFirst({ where: { id } });
    if (!itemFound) {
      throw new Http404Exception(`items '#${id}' not found, you should create item first`);
    }
    const categoryFound = !!(
      data.categoryId === undefined
      || data.categoryId === null
      || await database.category.findFirst({ where: { id: data.categoryId } })
    );
    if (!categoryFound) {
      throw new Http400Exception(`category '#${data.categoryId}' not found, you should create category first`);
    }
    return database.item.update({
      where: { id },
      data: action === 'increase'
        ? { ...data, frequency: { increment: 1 } }
        : data,
      include: { category: true },
    });
  };

export const itemPatchRoute: Route = {
  location: {
    method: 'patch',
    path: '/items/:id',
  },
  handler: () => <ExceptionHandler>
    <ItemPatchHandler />
  </ExceptionHandler>,
};

export default itemPatchRoute;
