import type { Handler } from '@rester/core';
import { ExceptionHandler, SchemaHandler } from '@rester/handlers';
import type { Route } from '@rester/serverless';

export const BenchmarkHandler: Handler =
  async () => <SchemaHandler mime="text/plain">Hello, world!</SchemaHandler>;

export const benchmarkRoute: Route = {
  location: {
    method: 'get',
    path: '/benchmark',
  },
  handler: () => <ExceptionHandler>
    <BenchmarkHandler />
  </ExceptionHandler>,
};

export default benchmarkRoute;
