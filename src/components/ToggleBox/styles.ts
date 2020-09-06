import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface BoxContainerProps {
  isSelected: boolean;
  boxSize: "normal" | "big";
}

interface BoxIconProps {
  isSelected: boolean;
  boxSize: "normal" | "big";
}

interface BoxTextProps {
  isSelected: boolean;  
  boxSize: "normal" | "big";
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
`;

export const BoxContainer = styled.TouchableOpacity<BoxContainerProps>`
  width: ${width / 2 - 45}px;
  height: ${({ boxSize }) => boxSize === "normal" ? 50 : width / 2 - 45}px;
  flex-direction: ${({ boxSize }) => boxSize === "normal" ? 'row' : 'column'};
  justify-content: center;
  align-items: center;
  background-color: ${({ isSelected }) => isSelected ? "rgba(86,125,244, 0.05)" : 'transparent'};
  border-color: ${({ isSelected }) => isSelected ? '#567DF4' : '#EEF2FE'};
  border-width: ${({ boxSize }) => boxSize === "normal" ? 1 : 2}px;
  border-radius: 10px;
`;

export const BoxIcon = styled(Feather)<BoxIconProps>`
  color: ${({ isSelected }) => isSelected ? '#567DF4' : '#C7C7CD'};
  font-size: ${({ boxSize }) => boxSize === "normal" ? 20 : 40}px;
  margin-right: ${({ boxSize }) => boxSize === "normal" ? 10 : 0}px;
`;

export const BoxText = styled.Text<BoxTextProps>`
  color: ${({ isSelected }) => isSelected ? '#567DF4' : '#C7C7CD'};
  font-size: ${({ boxSize }) => boxSize === "normal" ? 16 : 18}px;
  font-family: 'Gilroy-Semibold';
`;  