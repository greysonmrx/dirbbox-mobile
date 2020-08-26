import styled from 'styled-components/native';
import { Fontisto } from '@expo/vector-icons'
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Button from '../../components/Button';

export const Scroll = styled(KeyboardAwareScrollView)`
  flex: 1;
  background-color: #FFFFFF;
`;

export const Background = styled.Image`
  flex: 1;
  position: absolute;
  height: 600px;
  width: 100%;
`;

export const Container = styled.View`
  padding: 350px 30px ${getBottomSpace()}px;
`;

export const Content = styled.View`
  max-width: 60%;
  margin-bottom: 30px;
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  color: #22215B;
  margin-bottom: 4px;
  font-family: 'Gilroy-Light';
`;

export const Title = styled.Text`
  font-size: 38px;
  margin-bottom: 10px;
  color: #22215B;
  font-family: 'Gilroy-Bold';
`;

export const Text = styled.Text`
  font-size: 14px;
  color: #7B7F9E;
  line-height: 25px;
  font-family: 'Gilroy-Medium';
`;

export const Form = styled.View`
  margin-top: 30px;
`;

export const ButtonRegister = styled(Button)`
  margin-bottom: 20px;
`;

export const ButtonRegisterText = styled.Text`
  font-size: 16px;
  color: #FFFFFF;
  font-family: 'Gilroy-Semibold';
`;

export const ButtonRegisterIcon = styled(Fontisto).attrs({
  name: "arrow-right-l"
})`
  font-size: 16px;
  color: #FFFFFF;
  margin-left: 10px;
`;

export const ButtonBack = styled(Button)`
  margin-bottom: 40px;
`;

export const ButtonBackText = styled.Text`
  font-size: 16px;
  color: #1B1D28;
  font-family: 'Gilroy-Regular';
`;