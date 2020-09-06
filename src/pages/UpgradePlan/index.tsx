import React, { useState, useCallback } from 'react';
import Animated from 'react-native-reanimated';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import ToggleBox from '../../components/ToggleBox';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
  Scroll,
  ScrollContainer,
  ButtonText,
} from './styles';

interface UpgradePlanProps {
  style: {
    borderRadius: Animated.Node<number>;
    transform: {
        scale: Animated.Node<number>;
    }[];
  }
}

const UpgradePlan: React.FC<UpgradePlanProps> = ({ style }) => {
  const { user, updateUser } = useAuth();
  const navigation = useNavigation();

  const [storage, setStorage] = useState(user.storage);

  const handleUpdateStorage = useCallback(
    async () => {
      try {
        const response = await api.patch('/storage', { storage });

        updateUser(response.data);

        navigation.goBack();
      } catch (err) {
        Alert.alert(
          "Erro ao atualizar o plano",
          err.response?.data.message || "Ocorreu um erro ao atualizar o plano."
        )
      } 
  },[storage])

  return (
    <Container
      as={Animated.View}
      style={style}
    >
      <Header title="Atualizar Plano"/>
      <Scroll>
        <ScrollContainer>
          <ToggleBox 
            boxSize="big"
            label="Armazenamento"
            value={storage}
            onChange={setStorage}
          />
          <Button onPress={handleUpdateStorage}>
            <ButtonText>Atualizar plano</ButtonText>
          </Button>
        </ScrollContainer>
      </Scroll>
    </Container>
  );
}

export default UpgradePlan;