import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface BoxContainerProps {
  isSelected: boolean;
}

interface BoxIconProps {
  isSelected: boolean;
}

interface BoxTextProps {
  isSelected: boolean;
}

export const Container = styled.View`
  width: 100%;
  margin-bottom: 30px;
`;

export const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 4px;
  color: #1B1D28;
  font-family: 'Gilroy-Medium';
`;

export const BoxesContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
`;

export const BoxContainer = styled.TouchableOpacity<BoxContainerProps>`
  width: ${width / 2 - 45}px;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ isSelected }) => isSelected ? "rgba(86,125,244, 0.05)" : 'transparent'};
  border: 1px solid ${({ isSelected }) => isSelected ? '#567DF4' : '#EEF2FE'};
  font-size: 16px;
  font-family: 'Gilroy-Medium';
  border-radius: 10px;
`;

export const BoxIcon = styled(Feather)<BoxIconProps>`
  color: ${({ isSelected }) => isSelected ? '#567DF4' : '#C7C7CD'};
  font-size: 20px;
  margin-right: 10px;
`;

export const BoxText = styled.Text<BoxTextProps>`
  color: ${({ isSelected }) => isSelected ? '#567DF4' : '#C7C7CD'};
  font-size: 16px;
  font-family: 'Gilroy-Semibold';
`;  