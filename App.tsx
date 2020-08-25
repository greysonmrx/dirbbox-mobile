import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text } from 'react-native';
import { loadAsync } from 'expo-font';

import Routes from './src/routes';

const customFonts = {
  'Gilroy-Light': require('./src/assets/fonts/Gilroy-Light.otf'),
  'Gilroy-Regular': require('./src/assets/fonts/Gilroy-Regular.ttf'),
  'Gilroy-Medium': require('./src/assets/fonts/Gilroy-Medium.ttf'),
  'Gilroy-Semibold': require('./src/assets/fonts/Gilroy-SemiBold.ttf'),
  'Gilroy-Bold': require('./src/assets/fonts/Gilroy-Bold.ttf'),
  'AvenirNextCyr-Demi': require('./src/assets/fonts/AvenirNextCyr-Demi.ttf'),
  'AvenirNextCyr-Medium': require('./src/assets/fonts/AvenirNextCyr-Medium.ttf'),
};

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function _loadFontsAsync() {
    await loadAsync(customFonts);
    setFontsLoaded(true);
  }

  useEffect(() => {
    _loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    return <View><Text>Carregando</Text></View>
  }

  return (
    <>
      <Routes />
      <StatusBar style={Platform.select({ ios: 'dark', android: 'light' })} backgroundColor="#567DF4" />
    </>
  );
}


export default App;