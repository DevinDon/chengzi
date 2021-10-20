import { registerRoute, Serverless } from '@rester/serverless';
import { benchmarkRoute } from './app/benchmark';
import { categoriesGetRoute, categoryDeleteRoute, categoryGetRoute, categoryPatchRoute, categoryPostRoute } from './app/categories';
import { seedRoute } from './app/seed';
import { environment } from './environments/environment';

const launchServerless = async () => {

  const server = new Serverless(environment.serverOptions);

  await Promise.all([
    server.route(registerRoute),
    server.route(benchmarkRoute),
    server.route(seedRoute),
    server.route(categoryDeleteRoute),
    server.route(categoryGetRoute),
    server.route(categoriesGetRoute),
    server.route(categoryPatchRoute),
    server.route(categoryPostRoute),
  ]);

  server.listen(environment.listeningOptions);

};

launchServerless();
