import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const containerColors = {
  blue: '#EEF7FE',
  yellow: '#FFFBEC',
  red: '#FEEEEE',
  green: '#F0FFFF',
}

interface ContainerProps {
  color: 'blue' | 'green' | 'yellow' | 'red';
  mode: 'list' | 'grid';
}

interface ColorProp {
  color: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${({ mode }) => mode === 'grid' ? width / 2 - 40 : width - 60}px;
  background-color: ${({ color }) => containerColors[color]};
  padding: 16px;
  border-radius: 20px;
  margin-bottom: 20px;
`;

export const TopSide = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const FolderImage = styled.Image`
  height: 38px;
  resize-mode: contain;
`;

export const OptionButton = styled.TouchableOpacity``;

export const OptionIcon = styled(Feather).attrs({
  name: 'more-vertical'
})<ColorProp>`
  color: ${({ color }) => color};
  font-size: 23px;
  margin-right: -5px;
`;

export const BottomSide = styled.View``;

export const FolderName = styled.Text<ColorProp>`
  color: ${({ color }) => color};
  font-size: 15px;
  font-family: 'Gilroy-Medium';
  margin-bottom: 2px;
`;

export const FolderDate = styled.Text<ColorProp>`
  color: ${({ color }) => color};
  font-size: 10px;
  font-family: 'Gilroy-Regular';
`;
