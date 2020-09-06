import React, { 
  useState, useEffect, useCallback, useImperativeHandle, forwardRef
} from 'react';
import { Animated, Dimensions } from 'react-native';
import { PanGestureHandler, State, PanGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

import {
  Container,
  Button,
  Content,
  Title
} from './styles';

interface BottomSheetProps {
  title: string;
  children: React.ReactNode;
}

export interface BottomSheetHandles {
  open(): void;
  close(): void;
}

const BottomSheet: React.RefForwardingComponent<BottomSheetHandles, BottomSheetProps> = ({ 
  title, children 
}, ref) => {
  let offset = 0;

  const [visible, setVisible] = useState(false);
  const [state] = useState({
    containerOpacity: new Animated.Value(0),
    containerPosition: new Animated.Value(height),
    bottomSheetPosition: new Animated.Value(500),
  });

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: state.bottomSheetPosition
        }
      }
    ],
    { useNativeDriver: true },
  );

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
        Animated.timing(state.bottomSheetPosition, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(state.bottomSheetPosition, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }).start();
  
      Animated.timing(state.containerPosition, {
        toValue: height,
        duration: 0,
        delay: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const onHandlerStateChanged = useCallback((event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      if (event.nativeEvent.translationY >= 50) {
        Animated.timing(state.bottomSheetPosition, {
          toValue: 500,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
        });
      } else {
        Animated.timing(state.bottomSheetPosition, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [])

  return (
    <Container
      as={Animated.View}
      style={{
        opacity: state.bottomSheetPosition.interpolate({
          inputRange: [0, 500],
          outputRange: [1, 0]
        }),
        transform: [{ translateY: state.containerPosition }],
      }}
    >
      <Button 
        onPress={close} 
        activeOpacity={1} 
      />
      <PanGestureHandler
        onGestureEvent={animatedEvent}
        onHandlerStateChange={onHandlerStateChanged}
      >
        <Content
            as={Animated.View}
            style={{
              transform: [{ translateY: state.bottomSheetPosition.interpolate({
                  inputRange: [0, 500],
                  outputRange: [0, 500],
                  extrapolate: "clamp",
                }) 
              }],
            }}
          >
          <Title>{title}</Title>
          {children}
        </Content>
      </PanGestureHandler>
    </Container>
  )
}

export default forwardRef(BottomSheet);