import constate from 'constate';
import { useCallback, useState } from 'react';

export interface Config {
  autoClear: boolean;
  autoCopy: boolean;
}

const configKey = 'order-formatter/config';

const saveConfig = (config: Config) => {
  localStorage.setItem(configKey, JSON.stringify(config));
};

const loadConfig = (): Config => {
  const config = localStorage.getItem(configKey);
  return config ? JSON.parse(config) : { autoClear: true, autoCopy: true };
}

const useConfigurations = ({ initial = loadConfig() }) => {
  const [config, setConfig] = useState(initial);

  const updateAutoClear = useCallback(
    (autoClear: boolean) => setConfig(
      prev => {
        const newConfig = { ...prev, autoClear };
        setConfig(newConfig);
        saveConfig(newConfig);
        return prev;
      },
    ),
    [],
  );

  const updateAutoCopy = useCallback(
    (autoCopy: boolean) => setConfig(
      prev => {
        const newConfig = { ...prev, autoCopy };
        setConfig(newConfig);
        saveConfig(newConfig);
        return prev;
      },
    ),
    [],
  );

  return { config, updateAutoClear, updateAutoCopy };
};

export const [ConfigProvider, useConfig, useUpdateAutoClear, useUpdateAutoCopy] = constate(
  useConfigurations,
  value => value.config,
  value => value.updateAutoClear,
  value => value.updateAutoCopy,
)
