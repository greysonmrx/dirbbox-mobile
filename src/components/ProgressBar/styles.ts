import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

interface ProgressProps {
  color: string;
  progress: number;
}

const { width } = Dimensions.get("window");

export const Container = styled.View`
  height: 4px;
  width: ${width / 3}px;
  background-color: #EEF7FE;
  align-items: flex-end;
  border-radius: 2px;
  overflow: hidden;
`;

export const Progress = styled.View<ProgressProps>`
  position: absolute;
  height: 4px;
  right: 0;
  width: ${({ progress }) => (width / 3) * progress / 100}px;
  border-radius: 2px;
  background-color: ${({ color }) => color};
`;