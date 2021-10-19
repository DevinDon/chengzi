import { registerRoute, Serverless } from '@rester/serverless';
import { environment } from './environments/environment';
import { benchmarkRoute } from './app/benchmark';
import { seedRoute } from './app/seed';

const launchServerless = async () => {

  const server = new Serverless(environment.serverOptions);

  await Promise.all([
    server.route(registerRoute),
    server.route(benchmarkRoute),
    server.route(seedRoute),
  ]);

  server.listen(environment.listeningOptions);

};

launchServerless();
