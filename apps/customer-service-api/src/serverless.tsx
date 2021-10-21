import { registerRoute, Serverless } from '@rester/serverless';
import { benchmarkRoute } from './app/benchmark';
import { categoriesGetRoute, categoryDeleteRoute, categoryGetRoute, categoryPatchRoute, categoryPostRoute } from './app/categories';
import { itemDeleteRoute, itemGetRoute, itemPatchRoute, itemPostRoute, itemsGetRoute } from './app/items';
import { seedRoute } from './app/seed';
import { environment } from './environments/environment';

const launchServerless = async () => {

  const server = new Serverless(environment.serverOptions);

  await server.routes([
    registerRoute,
    benchmarkRoute,
    seedRoute,
    categoryDeleteRoute,
    categoryGetRoute,
    categoriesGetRoute,
    categoryPatchRoute,
    categoryPostRoute,
    itemDeleteRoute,
    itemGetRoute,
    itemsGetRoute,
    itemPatchRoute,
    itemPostRoute,
  ]);

  server.listen(environment.listeningOptions);

};

launchServerless();
