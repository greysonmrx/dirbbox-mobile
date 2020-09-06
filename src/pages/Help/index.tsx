import React from 'react';
import Animated from 'react-native-reanimated';

import Header from '../../components/Header';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Content,
  Logo,
  Version,
  ButtonText,
} from './styles';

interface HelpProps {
  style: {
    borderRadius: Animated.Node<number>;
    transform: {
        scale: Animated.Node<number>;
    }[];
  }
}

const Help: React.FC<HelpProps> = ({ style }) => {
  return (
    <Container
      as={Animated.View}
      style={style}
    >
      <Header title="Ajuda" />
      <Content>
        <Logo source={logoImg}/>
        <Version>Versão 2.0.1</Version>
        <Button
          onPress={() => {}}
          type="text"
        >
          <ButtonText>Avaliar o Dirbbox</ButtonText>
        </Button>
      </Content>
    </Container>
  );
}

export default Help;