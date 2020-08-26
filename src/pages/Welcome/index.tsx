import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  supportedAuthenticationTypesAsync,
  hasHardwareAsync,
  authenticateAsync,
  isEnrolledAsync
} from 'expo-local-authentication';

import BackgroundImage from '../../assets/background.png';

import {
  Scroll,
  Background,
  Container,
  Content,
  SubTitle,
  Title,
  Text,
  ButtonsContainer,
  ButtonSmartLogin,
  ButtonSmartLoginText,
  ButtonSmartLoginIcon,
  ButtonLogin,
  ButtonLoginText,
  ButtonLoginIcon,
  ButtonRegister,
  ButtonRegisterText,
} from './styles';

const Welcome: React.FC = () => {
  const navigation = useNavigation();

  const [authenticationType, setAuthenticationType] = useState<number>(0);

  function handleNavigateToLogin(): void {
    navigation.navigate('Login');
  }

  async function authenticate(): Promise<void> {
    const response = await authenticateAsync({ cancelLabel: 'Cancelar', disableDeviceFallback: true });

    if (response.success) {
      // Login in to the app
    } else {
      // Shows an error
    }
  }

  useEffect(() => {
    async function getAuthenticationType(): Promise<void> {
      const hasHardware = await hasHardwareAsync();

      if (!hasHardware) return;

      const biometricRecords = await isEnrolledAsync();

      if (!biometricRecords) return;

      const response = await supportedAuthenticationTypesAsync();

      setAuthenticationType(response[0]);
    }

    getAuthenticationType();
  }, []);

  return (
    <Scroll>
      <Background
        source={BackgroundImage}
      />
      <Container>
        <Content>
          <SubTitle>Bem vindo ao</SubTitle>
          <Title>Dirbbox</Title>
          <Text>
            Melhor plataforma de armazenamento de arquivos em nuvem para gerenciar seus dados.
            {"\n\n"}
            Entre, é de graça!
        </Text>
        </Content>
        <ButtonsContainer>
          {
            authenticationType !== 0 &&
            <ButtonSmartLogin type="secondary" onPress={authenticate}>
              {
                authenticationType === 1 ? (
                  <>
                    <ButtonSmartLoginIcon name="fingerprint" size={30} />
                    <ButtonSmartLoginText>Touch Id</ButtonSmartLoginText>
                  </>
                ) : (
                    <>
                      <ButtonSmartLoginIcon name="face-recognition" size={25} style={{ marginRight: 10 }} />
                      <ButtonSmartLoginText>Face Id</ButtonSmartLoginText>
                    </>
                  )
              }
            </ButtonSmartLogin>
          }
          <ButtonLogin onPress={handleNavigateToLogin}>
            <ButtonLoginText>Conectar</ButtonLoginText>
            <ButtonLoginIcon />
          </ButtonLogin>
        </ButtonsContainer>
        <ButtonRegister type="text" onPress={() => console.log('1')}>
          <ButtonRegisterText>Criar uma conta</ButtonRegisterText>
        </ButtonRegister>
      </Container>
    </Scroll>
  );
}

export default Welcome;
