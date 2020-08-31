import React, { useState, useEffect } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';

const { height } = Dimensions.get('window');

import {
  Container,
  Button,
  Content,
  Title
} from './styles';

interface BottomSheetProps {
  show: boolean;
  onClose(): void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ show, onClose, children }) => {
  const [state] = useState({
    containerOpacity: new Animated.Value(0),
    containerPosition: new Animated.Value(height),
    bottomSheetPosition: new Animated.Value(500),
  });

  function openModal() {
    Animated.parallel([
      Animated.timing(state.containerPosition, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(state.containerOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(state.bottomSheetPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function closeModal() {
    Animated.parallel([
      Animated.timing(state.bottomSheetPosition, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(state.containerOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();

    Animated.timing(state.containerPosition, {
      toValue: height,
      duration: 0,
      delay: 300,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    if (show) {
      openModal();
    } else {
      closeModal();
    }      
  }, [show]);

  return (
    <Container
      as={Animated.View}
      style={{
        opacity: state.containerOpacity,
        transform: [{ translateY: state.containerPosition }],
      }}
    >
      <Button onPress={onClose} activeOpacity={1} />
      <Content
          as={Animated.View}
          style={{
            transform: [{ translateY: state.bottomSheetPosition }],
          }}
        >
        <Title>Criar novo</Title>
        {children}
      </Content>
    </Container>
  )
}

export default BottomSheet;