import React, {
  useState, useCallback, useEffect,
} from 'react';
import { Animated } from 'react-native';

import {
  Container,
  Button,
  Ball,
} from './styles';

interface SwitchProps {
  value: boolean;
  onChange(value: boolean): void;
}

const Switch: React.FC<SwitchProps> = ({ value, onChange }) => {
  const [translateX] = useState(new Animated.Value(5));

  useEffect(() => {
    if (value) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 19,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 5,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [value]);

  const handleToggleSwitch = useCallback(() => {
    onChange(!value);
  }, [value]);

  return (
    <Container
      as={Animated.View}
      style={{
        backgroundColor: translateX.interpolate({
          inputRange: [5, 19],
          outputRange: ['#DDDDDD', '#567DF4']
        })
      }}
    >
      <Button 
        activeOpacity={1}
        onPress={handleToggleSwitch}
        hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }}
      >
        <Ball 
          as={Animated.View}
          style={{ transform: [{ translateX }] }}
        />
      </Button>
    </Container>
  );
}

export default Switch;