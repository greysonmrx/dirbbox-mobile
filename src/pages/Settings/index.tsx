import React, { useRef } from 'react';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import Switch from '../../components/Switch';
import BottomSheet, { BottomSheetHandles } from '../../components/BottomSheet';

import { useSettings } from '../../hooks/setting';

import {
  Container,
  Scroll,
  ScrollContainer,
  ItemContainer,
  ItemButton,
  ItemButtonText,
  ItemButtonIcon,
  ItemContainerText,
  ItemLeftSide,
  ItemContainerIcon,
  BottomSheetContent,
  BottomSheetText,
  Bold,
  Button,
  ButtonText,
} from './styles';

interface SettingsProps {
  style: {
    borderRadius: Animated.Node<number>;
    transform: {
        scale: Animated.Node<number>;
    }[];
  }
}

const Settings: React.FC<SettingsProps> = ({ style }) => {
  const { privacyScreen, setPrivacyScreen } = useSettings();

  const navigation = useNavigation();

  const privacyScreenBottomSheetRef = useRef<BottomSheetHandles>(null);
  
  return (
    <>
      <Container
        as={Animated.View}
        style={style}
      >
        <Header title="Configurações"/>
        <Scroll>
          <ScrollContainer>
            <ItemButton onPress={() => navigation.navigate('EditProfile')}>
              <ItemButtonText>Editar perfil</ItemButtonText>
              <ItemButtonIcon />
            </ItemButton>
            <ItemButton onPress={() => navigation.navigate('UpgradePlan')}>
              <ItemButtonText>Atualizar plano</ItemButtonText>
              <ItemButtonIcon />
            </ItemButton>
            <ItemButton onPress={() => navigation.navigate('ChangePassword')}>
              <ItemButtonText>Alterar senha</ItemButtonText>
              <ItemButtonIcon />
            </ItemButton>
            <ItemContainer>
              <ItemLeftSide onPress={() => privacyScreenBottomSheetRef.current?.open()}>
                <ItemContainerText>Tela de privacidade</ItemContainerText>
                <ItemContainerIcon />
              </ItemLeftSide>
              <Switch 
                value={privacyScreen}
                onChange={setPrivacyScreen}
              />
            </ItemContainer>
          </ScrollContainer>
        </Scroll>
      </Container>
      <BottomSheet 
        ref={privacyScreenBottomSheetRef}
        title="Tela de privacidade"
      >
        <BottomSheetContent>
          <BottomSheetText>
            Quando a <Bold>Tela de privacidade</Bold> estiver habilitada, toda vez que você mudar de aplicativo será necessário se 
            autenticar novamente.
          </BottomSheetText>
          <Button onPress={() => privacyScreenBottomSheetRef.current?.close()}>
            <ButtonText>Ok, entendi</ButtonText>
          </Button>
        </BottomSheetContent>
      </BottomSheet>
    </>
  );
}

export default Settings;