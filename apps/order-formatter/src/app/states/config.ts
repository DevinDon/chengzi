import { debounce } from '@chengzi-tools/performance';
import constate from 'constate';
import { useCallback, useState } from 'react';

export interface Config {
  autoPaste: boolean;
  autoCopy: boolean;
}

// save & load config
const configKey = 'order-formatter/config';

const saveConfig = debounce(
  (config: Config) => {
    localStorage.setItem(configKey, JSON.stringify(config));
  },
);

const loadConfig = (): Config => {
  const config = localStorage.getItem(configKey);
  return config ? JSON.parse(config) : { autoPaste: false, autoCopy: false };
};

// state
const useConfigurations = ({ initial = loadConfig() }) => {
  const [config, setConfig] = useState(initial);

  const updateAutoPaste = useCallback(
    (autoPaste: boolean) => setConfig(
      prev => {
        const newConfig = { ...prev, autoPaste };
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

  return { config, updateAutoPaste, updateAutoCopy };
};

export const [ConfigProvider, useConfig, useUpdateAutoPaste, useUpdateAutoCopy] = constate(
  useConfigurations,
  value => value.config,
  value => value.updateAutoPaste,
  value => value.updateAutoCopy,
);
