import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

import {
  Container,
  CheckContainer,
  CheckIcon,
} from './styles';

interface ColorProps {
  color: string;
  isSelected: boolean;
  onPress(): void;
}

const Color: React.FC<ColorProps> = ({ color, isSelected, onPress }) => {
  const [scale] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isSelected) {
      Animated.spring(scale, {
        toValue: 1,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scale, {
        toValue: 0,
        bounciness: 10,
        useNativeDriver: true,
      }).start();
    }
  }, [isSelected]);

  return (
    <Container
      color={color}
      onPress={onPress}
    >
      <CheckContainer
        as={Animated.View}
        style={{
          transform: [{ scale }]
        }}
      >
        <CheckIcon />
      </CheckContainer>
    </Container>
  );
}

export default Color;