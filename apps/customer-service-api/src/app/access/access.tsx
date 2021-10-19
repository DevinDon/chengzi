import type { Handler } from '@rester/core';
import { usePrisma, useUrl } from '@rester/hooks';

export const AccessHandler: Handler =
  async (_, { logger, request, response, next, useContext }) => {
    const result = await next() as string;

    const { url } = useUrl(useContext);
    const { database } = await usePrisma(useContext);

    database.access
      .create({
        data: {
          url: request?.url ?? '',
          path: url?.path ?? '',
          method: url?.method ?? 'unknown',
          query: url?.query ?? {},
          variables: url?.variables ?? {},
          headers: request?.headers ?? {},
          code: response?.statusCode ?? -1,
          message: response?.statusMessage,
          length: result?.length ?? -1,
          ip: request?.headers['x-real-ip'] as string
            ?? request?.headers['forwarded'] as string
            ?? request?.headers['x-forwarded-for'] as string
            ?? request?.socket?.remoteAddress
            ?? '999.999.999.999',
        },
      })
      .catch(reason => logger.warn(`Access record failed, detail: ${reason.message}\n${reason.stack}`));

    return result;
  };
