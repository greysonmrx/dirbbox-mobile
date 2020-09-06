import React, { 
  useState, useEffect, useCallback, useImperativeHandle, forwardRef
} from 'react';
import { Animated, Dimensions, Platform, Easing } from 'react-native';

const { height } = Dimensions.get('window');

import {
  Container,
  Wrapper,
  Content,
  Title,
} from './styles';

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

export interface ModalHandles {
  open(): void;
  close(): void;
}

const Modal: React.RefForwardingComponent<ModalHandles, ModalProps> = ({ title, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const [state] = useState({
    containerOpacity: new Animated.Value(0),
    containerPosition: new Animated.Value(height),
    modalScale: new Animated.Value(0),
  });

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(state.containerPosition, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(state.containerOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(state.modalScale, {
          toValue: 1,
          bounciness: 10,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(state.modalScale, {
          toValue: 0,
          duration: 350,
          easing: Easing.bezier(0.3, -0.35, 0.3, -0.35),
          useNativeDriver: true,
        }),
        Animated.timing(state.containerOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(state.containerPosition, {
          toValue: height,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);
  
  return (
    <Container
      as={Animated.View}
      style={{
        opacity: state.containerOpacity,
        transform: [{ translateY: state.containerPosition }],
      }}
    >
      <Wrapper
        behavior="padding"
        enabled={Platform.OS === 'ios'}
      >
        <Content
          as={Animated.View}
          style={{
            transform: [{ scale: state.modalScale }],
          }}
        >
          <Title>{title}</Title>
          {children}
        </Content>
      </Wrapper>
    </Container>
  );
}

export default forwardRef(Modal);