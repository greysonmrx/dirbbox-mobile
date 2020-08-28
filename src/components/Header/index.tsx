import React from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import {
  Container,
  HeaderButton,
  HeaderIcon,
  HeaderTitle
} from './styles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <Container>
      <HeaderButton 
        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20,  }}
        onPress={() => navigation.goBack()}  
      >
        <HeaderIcon name="keyboard-arrow-left"/>
      </HeaderButton>
      <HeaderTitle>{title}</HeaderTitle>
      <HeaderButton 
        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20,  }}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
      >
        <HeaderIcon name="more-horiz"/> 
      </HeaderButton>
    </Container>
  )
}

export default Header;