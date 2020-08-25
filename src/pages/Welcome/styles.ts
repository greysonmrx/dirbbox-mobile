import styled from 'styled-components/native';
import { MaterialCommunityIcons, Fontisto } from '@expo/vector-icons'

import Button from '../../components/Button';

export const Scroll = styled.ScrollView`
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
  padding: 0 30px;
  padding-top: 350px;
`;

export const Content = styled.View`
  max-width: 75%;
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

export const ButtonsContainer = styled.View`
  padding: 40px 0;
`;

export const ButtonSmartLogin = styled(Button)``;

export const ButtonSmartLoginText = styled.Text`
  font-size: 16px;
  color: #567DF4;
  font-family: 'Gilroy-Semibold';
`;

export const ButtonSmartLoginIcon = styled(MaterialCommunityIcons)`
  color: #567DF4;
  margin-right: 5px;
`;

export const ButtonLogin = styled(Button)`
  margin-top: 20px;
`;

export const ButtonLoginText = styled.Text`
  font-size: 16px;
  color: #FFFFFF;
  font-family: 'Gilroy-Semibold';
`;

export const ButtonLoginIcon = styled(Fontisto).attrs({
  name: "arrow-right-l"
})`
  font-size: 16px;
  color: #FFFFFF;
  margin-left: 10px;
`;

export const ButtonRegister = styled(Button)`
  margin-bottom: 40px;
`;

export const ButtonRegisterText = styled.Text`
  font-size: 16px;
  color: #1B1D28;
  font-family: 'Gilroy-Regular';
`;
