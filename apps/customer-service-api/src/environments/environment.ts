import { ResterListeningOptions, ResterServerOptions } from '@rester/core/core/rester';
import { Level } from '@rester/logger';

const serverOptions: ResterServerOptions = {
  level: Level.debug,
};

const listeningOptions: ResterListeningOptions = {
  host: 'localhost',
  port: 8080,
};

export const environment = {
  production: false,
  serverOptions,
  listeningOptions,
};
