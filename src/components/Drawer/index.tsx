import React from 'react';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';

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

const Drawer: React.FC<DrawerContentComponentProps<DrawerContentOptions>> = ({ navigation, state }) => {
  function isFocused(routeIndex: number) {
    return state.index === routeIndex;
  }

  return (
    <Container>
      <ProfileContainer>
        <ProfileImage source={profileImg}/>
        <ProfileInfo>
          <ProfileName>Greyson</ProfileName>
          <ProfileEmail>greysonmrx@gmail.com</ProfileEmail>
        </ProfileInfo>
      </ProfileContainer>
      <ItemsContainer>
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
      <BottomContainer>
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
