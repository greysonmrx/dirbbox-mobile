import React from 'react';
import Animated from 'react-native-reanimated';

import { Container } from './styles';

interface StorageProps {
  style: {
    borderRadius: Animated.Node<number>;
    transform: {
        scale: Animated.Node<number>;
    }[];
  }
}

const Storage: React.FC<StorageProps> = ({ style }) => {
  return (
    <Container 
      style={style}
      as={Animated.View}
    />
  );
}

export default Storage;
