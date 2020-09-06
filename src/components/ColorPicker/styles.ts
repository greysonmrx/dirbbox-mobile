import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface ColorProps {
  color: string;
}

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: -10px 0 30px;
`;

export const Color = styled.TouchableOpacity<ColorProps>`
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
