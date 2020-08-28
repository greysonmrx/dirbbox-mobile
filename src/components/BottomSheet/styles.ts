import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  position: absolute;
  z-index: 5;
  width: ${width}px;
  height: ${height}px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;

export const Content = styled.View`
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 30px;
  padding-bottom: ${getBottomSpace() + 30}px;
  background-color: #FFFFFF;
`;

export const Title = styled.Text`
  font-family: 'Gilroy-Semibold';
  font-size: 15px;
  color: #22215B;
`;