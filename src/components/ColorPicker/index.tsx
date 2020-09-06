import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';

import Color from '../Color';

import {
  Container,
} from './styles';

interface ColorPickerProps {
  defaultValue?: string;
}

export interface ColorPickerHandles {
  getColor(): string;
}

const ColorPicker: React.RefForwardingComponent<ColorPickerHandles, ColorPickerProps> = ({
  defaultValue
}, ref) => {
  const [currentColor, setCurrentColor] = useState('blue');

  const colors = [
    {
      name: 'blue',
      color: '#567DF4',
    }, {
      name: 'yellow',
      color: '#FFB110',
    }, {
      name: 'red',
      color: '#F45656',
    }, {
      name: 'green',
      color: '#34DEDE',
    }
  ];

  useEffect(() => {
    if (defaultValue) {
      setCurrentColor(defaultValue);
    }
  }, [defaultValue])

  useImperativeHandle(ref, () => ({
    getColor,
  }));

  const getColor = useCallback(() => currentColor, [currentColor]);

  return (
    <Container>
      {
        colors.map(color => (
          <Color
            key={color.name}
            color={color.color}
            isSelected={currentColor === color.name}
            onPress={() => setCurrentColor(color.name)}
          />
        ))
      }
    </Container>
  );
}

export default forwardRef(ColorPicker);