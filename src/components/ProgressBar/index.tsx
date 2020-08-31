import React, { useState, useEffect } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';

import {
  Container,
  Progress
} from './styles';

interface ProgressBarProps {
  color: string;
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ color, progress }) => {
  const [width] = useState(
    new Animated.Value((Dimensions.get('window').width / 3) * progress / 100)
  );

  useEffect(() => {
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(width, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ]).start();
  }, [progress]);

  return (
    <Container>
      <Progress 
        as={Animated.View}
        color={color}
        progress={progress}
        style={{ transform: [{ translateX: width }] }}
      />
    </Container>
  );
}

export default ProgressBar;