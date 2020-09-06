import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Form as RNForm } from '@unform/mobile';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const Form = styled(RNForm)`
  padding: 30px 30px ${getBottomSpace() + 30}px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #FFFFFF;
  font-family: 'Gilroy-Semibold';
`;