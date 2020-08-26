import React, { useRef, useState, useCallback } from 'react';
import * as Yup from 'yup';
import { Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import ToggleBox from '../../components/ToggleBox';

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
  ButtonRegister,
  ButtonRegisterText,
  ButtonRegisterIcon,
  ButtonBack,
  ButtonBackText,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const [storageValue, setStorageValue] = useState(10);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        // Sign up
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
          <SubTitle>Registrar no</SubTitle>
          <Title>Dirbbox</Title>
          <Text>
            Nos dê algumas informações suas para se registrar na melhor plataforma de armazenamento em nuvem!
          </Text>
        </Content>
        <Form onSubmit={handleSignUp} ref={formRef}>
          <Input 
            autoCapitalize="words"
            name="name"
            label="Nome"
            placeholder="Insira seu nome"
            returnKeyType="next"
            onSubmitEditing={() => {
              emailInputRef.current?.focus();
            }}
          />
          <Input 
            ref={emailInputRef}
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
            returnKeyType="next"
          />
          <ToggleBox 
            label="Armazenamento"
            value={storageValue}
            onChange={setStorageValue}
          />
        </Form>
        <ButtonRegister onPress={() => formRef.current?.submitForm()}>
          <ButtonRegisterText>Registrar</ButtonRegisterText>
          <ButtonRegisterIcon />
        </ButtonRegister>
        <ButtonBack type="text" onPress={() => navigation.goBack()}>
          <ButtonBackText>Voltar</ButtonBackText>
        </ButtonBack>
      </Container>
    </Scroll>
  );
}

export default Register;
