import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface ContainerProps {
  color: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background-color: ${({ color }) => color};
`;

export const CheckContainer = styled.View`
  width: 100%;
  height: 100%;
  border-radius: 12.5px;
  align-items: center;
`;

export const CheckIcon = styled(Feather).attrs({
  name: "check"
})`
  color: #FFFFFF;
  font-size: 15px;
  margin-top: 5px;
`;
