import React, { useEffect } from 'react';
import { AppState } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';
import { useSettings } from '../hooks/setting';

const Routes: React.FC = () => {
  const { logged, exitApp } = useAuth();
  const { privacyScreen } = useSettings();

  useEffect(() => {
    if (privacyScreen) {
      AppState.addEventListener('change', exitApp);
    }

    return () => {
      AppState.removeEventListener('change', exitApp);
    }
  }, [privacyScreen]);

  return logged ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;