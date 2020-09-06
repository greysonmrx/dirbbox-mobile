import React from 'react';

import { AuthProvider } from './auth';
import { SettingProvider } from './setting';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <SettingProvider>
      {children}
    </SettingProvider>
  </AuthProvider>
);

export default AppProvider;