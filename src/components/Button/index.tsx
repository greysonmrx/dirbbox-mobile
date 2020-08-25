import React from 'react';

import { Container } from './styles';

type ButtonProps = {
  type?: 'default' | 'secondary' | 'text';
  onPress: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type = 'default', onPress, children, ...rest }) => {
  return (
    <Container
      type={type}
      onPress={onPress}
      {...rest}
    >
      {children}
    </Container>
  );
}

export default Button;
