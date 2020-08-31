import React, { useState, useEffect } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { DrawerContentComponentProps, DrawerContentOptions, useIsDrawerOpen } from '@react-navigation/drawer';

import profileImg from '../../assets/profile.png';

import { 
  Container,
  ProfileContainer, 
  ProfileImage,
  ProfileInfo,
  ProfileName,
  ProfileEmail,
  ItemsContainer,
  ItemButton,
  ItemLabel,
  BottomContainer,
  LogOutButton,
  LogOutIcon,
  LogOutText,
  Version,
} from './styles';

const Drawer: React.FC<DrawerContentComponentProps<DrawerContentOptions>> = ({ navigation, state, progress }) => {
  const isDrawerOpen = useIsDrawerOpen();

  const drawerWidth = Dimensions.get('window').width * 0.6

  const [profile] = useState(new Animated.Value((drawerWidth) * -1));
  const [items] = useState(new Animated.Value((drawerWidth) * -1));
  const [bottom] = useState(new Animated.Value((drawerWidth) * -1));

  useEffect(() => {
    if (isDrawerOpen) {
      Animated.parallel([
        Animated.spring(profile, {
          toValue: 0,
          delay: 150,
          useNativeDriver: true
        }),
        Animated.spring(items, {
          toValue: 0,
          delay: 250,
          useNativeDriver: true
        }),
        Animated.spring(bottom, {
          toValue: 0,
          delay: 350,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(profile, {
          toValue: (drawerWidth) * -1,
          duration: 100, 
          useNativeDriver: true
        }),
        Animated.timing(items, {
          toValue: (drawerWidth) * -1,
          duration: 100, 
          useNativeDriver: true
        }),
        Animated.timing(bottom, {
          toValue: (drawerWidth) * -1,
          duration: 100, 
          useNativeDriver: true
        })
      ]).start();
    }
  }, [isDrawerOpen]);

  function isFocused(routeIndex: number) {
    return state.index === routeIndex;
  }

  return (
    <Container>
      <ProfileContainer
        as={Animated.View}
        style={{ transform: [{ translateX: profile }] }}
      >
        <ProfileImage source={profileImg}/>
        <ProfileInfo>
          <ProfileName>Greyson</ProfileName>
          <ProfileEmail>greysonmrx@gmail.com</ProfileEmail>
        </ProfileInfo>
      </ProfileContainer>
      <ItemsContainer
        as={Animated.View}
        style={{ transform: [{ translateX: items }] }}
      >
        <ItemButton 
          isSelected={isFocused(0)}
          onPress={() => navigation.navigate('Home')}
        >
          <ItemLabel  isSelected={isFocused(0)}>Início</ItemLabel>
        </ItemButton>
        <ItemButton 
          isSelected={isFocused(1)}
          onPress={() => navigation.navigate('Profile')}
        >
          <ItemLabel isSelected={isFocused(1)}>Meu Perfil</ItemLabel>
        </ItemButton>
        <ItemButton 
          isSelected={isFocused(2)}
          onPress={() => navigation.navigate('Storage')}
        >
          <ItemLabel isSelected={isFocused(2)}>Armazenamento</ItemLabel>
        </ItemButton>
        <ItemButton isSelected={isFocused(3)}>
          <ItemLabel isSelected={isFocused(3)}>Configurações</ItemLabel>
        </ItemButton>
        <ItemButton isSelected={isFocused(4)}>
          <ItemLabel isSelected={isFocused(4)}>Ajuda</ItemLabel>
        </ItemButton>
      </ItemsContainer>
      <BottomContainer
        as={Animated.View}
        style={{ transform: [{ translateX: bottom }] }}
      >
        <LogOutButton>
          <LogOutIcon />
          <LogOutText>Sair</LogOutText>
        </LogOutButton>
        <Version>Versão 2.0.1</Version>
      </BottomContainer>
    </Container>
  );
}

export default Drawer;
