import React, { useRef, useCallback } from 'react';
import Animated from 'react-native-reanimated';
import * as Yup from 'yup';
import { Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from "@unform/core";

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Form,
  ButtonText,
} from './styles';

interface FormData {
  name: string;
  email: string;
}

interface EditProfileProps {
  style: {
    borderRadius: Animated.Node<number>;
    transform: {
        scale: Animated.Node<number>;
    }[];
  }
}

const EditProfile: React.FC<EditProfileProps> = ({ style }) => {
  const navigation = useNavigation();
  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, { abortEarly: false });

        const response = await api.put('/users', {
          name: data.name,
          email: data.email,
        });

        updateUser(response.data);

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro ao editar perfil',
          err.response?.data.message || 'Ocorreu um erro ao tentar editar perfil.'
        )
      }
  },[])

  return (
    <Container
      as={Animated.View}
      style={style}
    >
      <Header title="Editar Perfil"/>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={{ name: user.name, email: user.email }}
      >
        <Input 
          name="name"
          autoCapitalize="words"
          label="Nome completo"
          placeholder="Insira seu nome completo"
          returnKeyType="next"
          onSubmitEditing={() => {
            emailInputRef.current?.focus();
          }}
        />
        <Input 
          ref={emailInputRef}
          name="email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          label="Endereço de e-mail"
          placeholder="Insira seu e-mail"
          returnKeyType="send"
          onSubmitEditing={() => formRef.current?.submitForm()}
        />
        <Button onPress={() => formRef.current?.submitForm()}>
          <ButtonText>Editar perfil</ButtonText>
        </Button>
      </Form>
    </Container>
  );
}

export default EditProfile;