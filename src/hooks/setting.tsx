import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface SettingProviderProps {
  children?: React.ReactNode;
}

interface SettingContextData {
  privacyScreen: boolean;
  setPrivacyScreen(value: boolean): void;
}

interface SettingsState {
  privacyScreen: boolean;
}

const SettingContext = createContext<SettingContextData>({} as SettingContextData);

const SettingProvider: React.FC<SettingProviderProps> = ({ children }: SettingProviderProps) => {
  const [settings, setSettings] = useState({} as SettingsState);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const privacyScreen = await AsyncStorage.getItem('@Dirbbox:privacyScreen');

      if (privacyScreen) {
        setSettings({ privacyScreen: privacyScreen === "true"});
      }     
    }

    loadStorageData();
  }, []);

  const setPrivacyScreen = useCallback(async (value: boolean) => {
    await AsyncStorage.setItem('@Dirbbox:privacyScreen', JSON.stringify(value));

    setSettings({
      privacyScreen: value
    })
  }, [setSettings]); 

  return (
    <SettingContext.Provider
      value={{ privacyScreen: settings.privacyScreen, setPrivacyScreen }}
    >
      {children}
    </SettingContext.Provider>
  );
}

function useSettings(): SettingContextData {
  const context = useContext(SettingContext);

  if (!context) {
    throw new Error('useSettings must be used within an SettingProvider');
  }

  return context;
}

export { SettingProvider, useSettings };