import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  width: 100%;
`;

export const DoughnutContainer = styled.View`
  width: 100%;
  transform: rotate(-45deg);
`;

export const WhiteCircle = styled.View`
  position: absolute;
  left: ${width / 2.4}px;
  bottom: ${width / 6}px;
  background-color: #FFFFFF;
  width: ${width / 6}px;
  height: ${width / 6}px;
  border-radius: ${width / 12}px;
`;