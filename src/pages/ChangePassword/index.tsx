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

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Form,
  ButtonText,
} from './styles';

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ChangePasswordProps {
  style: {
    borderRadius: Animated.Node<number>;
    transform: {
        scale: Animated.Node<number>;
    }[];
  }
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ style }) => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const newPasswordRef = useRef<TextInput>(null);
  const confirmNewPasswordRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          currentPassword: Yup.string().required('A senha atual é obrigatória'),
          newPassword: Yup.string().required('A senha nova é obrigatória'),
          confirmNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'As senhas não coincidem')
            .required('A confirmação da senha é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.patch('/password', {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Erro ao alterar senha',
          err.response?.data.message || 'Ocorreu um erro ao tentar alterar senha.'
        )
      }
  },[])

  return (
    <Container
      as={Animated.View}
      style={style}
    >
      <Header title="Alterar Senha"/>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <Input 
          name="currentPassword"
          placeholder="Insira seu senha atual"
          label="Senha atual"
          secureTextEntry={true}
          returnKeyType="next"
          onSubmitEditing={() => newPasswordRef.current?.focus()}
        />
        <Input 
          ref={newPasswordRef}
          name="newPassword"
          placeholder="Insira a senha nova"
          label="Senha nova"
          secureTextEntry={true}
          returnKeyType="next"
          onSubmitEditing={() => confirmNewPasswordRef.current?.focus()}
        />
        <Input 
          ref={confirmNewPasswordRef}
          name="confirmNewPassword"
          placeholder="Insira a confirmação da senha"
          label="Confirme a senha nova"
          secureTextEntry={true}
          returnKeyType="send"
          onSubmitEditing={() => formRef.current?.submitForm()}
        />
        <Button onPress={() => formRef.current?.submitForm()}>
          <ButtonText>Alterar senha</ButtonText>
        </Button>
      </Form>
    </Container>
  );
}

export default ChangePassword;