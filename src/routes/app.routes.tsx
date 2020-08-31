import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { View } from 'react-native';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Storage from '../pages/Storage';

import DrawerComponent from '../components/Drawer';

const Drawer = createDrawerNavigator();

const AppRoutes: React.FC = () => {
  const [progress, setProgress] = useState<Animated.Node<number>>(new Animated.Value(0));

  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.7],
  });

  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 15],
  });

  const animatedStyle = { 
    borderRadius, 
    transform: [{ scale }], 
    overflow: 'hidden'
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F1F3F6' }}>
      <Drawer.Navigator 
        initialRouteName="Home"
        drawerType="back"
        edgeWidth={1}
        overlayColor="transparent"
        drawerStyle={{width: '60%', backgroundColor: 'transparent'}}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={props => {
          setProgress(props.progress);
          return <DrawerComponent {...props}/>
        }}
      >
        <Drawer.Screen name="Home"> 
          {props => <Home {...props} style={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name="Profile"> 
          {props => <Profile {...props} style={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name="Storage">
          {props => <Storage {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
}

export default AppRoutes;