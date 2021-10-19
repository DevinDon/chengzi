import { Handler } from '@rester/core';
import { ExceptionHandler, SchemaHandler } from '@rester/handlers';
import { Url, usePrisma, useUrl } from '@rester/hooks';
import type { Route } from '@rester/serverless';
import { Http400Exception } from '@rester/utils';
import { TSchema, Type } from '@sinclair/typebox';
import random from 'mockjs';

const { Random } = random;

const responseSchema: TSchema = Type.Object({
  count: Type.Number({ minimum: 0 }),
});

const validate = (url: Url) => {
  const { count } = url.query;
  if (count === undefined) {
    return { count: 1 };
  }
  if (+count > 0) {
    return { count: +count };
  }
  throw new Http400Exception('[count] must be a number > 0');
};

export const SeedHandler: Handler =
  async (_, { useContext }) => {
    const { url } = useUrl(useContext);
    return <SchemaHandler schema={responseSchema}>
      <Seed {...validate(url)} />
    </SchemaHandler>;
  };

export const Seed: Handler<{ count: number; }> =
  async ({ count }, { useContext, logger }) => {
    const { database } = await usePrisma(useContext);
    const existed = await database.category.count();
    if (existed < 5) {
      const created = await database.category.createMany({
        data: Array.from({ length: 5 - existed }, () => ({
          name: Random.cword(3, 5),
          description: Random.cword(10, 20),
        })),
      });
      logger.info(`Created ${created.count} categories`);
    }
    const { id, name } = (await database.category.findFirst())!;
    await database.item.createMany({
      data: Array.from({ length: count }, () => ({
        content: Random.csentence(6, 1000),
        categoryId: id,
      })),
    });
    logger.debug(`Generated ${count} aphorisms with category '${name}'`);
    return { count };
  };

export const seedRoute: Route = {
  location: {
    method: 'post',
    path: '/seed',
  },
  handler: () => <ExceptionHandler>
    <SeedHandler />
  </ExceptionHandler>,
};

export default seedRoute;
