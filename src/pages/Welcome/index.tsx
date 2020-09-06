import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  supportedAuthenticationTypesAsync,
  hasHardwareAsync,
  authenticateAsync,
  isEnrolledAsync
} from 'expo-local-authentication';
import { Alert } from 'react-native';

import { useAuth } from '../../hooks/auth';

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
  const { user, logIn } = useAuth();
  const navigation = useNavigation();

  const [authenticationType, setAuthenticationType] = useState<number>(0);

  const navigateToPage = useCallback((pageName: string) => {
    navigation.navigate(pageName);
  }, []);

  async function authenticate(): Promise<void> {
    const response = await authenticateAsync({ cancelLabel: 'Cancelar', disableDeviceFallback: true });

    if (response.success) {
      logIn();
    } else {
      Alert.alert('Erro na autenticação');
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
            user && (
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
            )
          }
          <ButtonLogin onPress={() => navigateToPage('Login')}>
            <ButtonLoginText>Conectar</ButtonLoginText>
            <ButtonLoginIcon />
          </ButtonLogin>
        </ButtonsContainer>
        <ButtonRegister type="text" onPress={() => navigateToPage('Register')}>
          <ButtonRegisterText>Criar uma conta</ButtonRegisterText>
        </ButtonRegister>
      </Container>
    </Scroll>
  );
}

export default Welcome;
