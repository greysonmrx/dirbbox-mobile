import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { Alert, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';

import getValidationErrors from '../../utils/getValidationErrors';

import BackgroundImage from '../../assets/background.png';

import {
  Scroll,
  Background,
  Container,
  Content,
  SubTitle,
  Title,
  Text,
  ButtonLogin,
  ButtonLoginText,
  ButtonLoginIcon,
  ButtonRegister,
  ButtonRegisterText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        // Sign in
        console.log(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um error ao fazer login, cheque as credenciais.',
        );
      }
    },
    [],
  );

  return (
    <Scroll>
      <Background
        source={BackgroundImage}
      />
      <Container>
        <Content>
          <SubTitle>Conectar no</SubTitle>
          <Title>Dirbbox</Title>
          <Text>
            Entre com seus dados que você inseriu durante seu registro para entrar na aplicação.
          </Text>
        </Content>
        <Form onSubmit={handleSignIn} ref={formRef}>
          <Input 
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            name="email"
            label="Endereço de e-mail"
            placeholder="Insira seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInputRef.current?.focus();
            }}
          />
          <Input
            ref={passwordInputRef} 
            name="password" 
            label="Senha secreta"
            placeholder="Insira sua senha"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={() => formRef.current?.submitForm()}
          />
        </Form>
        <ButtonLogin onPress={() => formRef.current?.submitForm()}>
          <ButtonLoginText>Conectar</ButtonLoginText>
          <ButtonLoginIcon />
        </ButtonLogin>
        <ButtonRegister type="text" onPress={() => navigation.goBack()}>
          <ButtonRegisterText>Voltar</ButtonRegisterText>
        </ButtonRegister>
      </Container>
    </Scroll>
  );
}

export default Login;
