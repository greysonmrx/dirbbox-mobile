import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface IconContainerProps {
  background: string;
}

export const Container = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Content = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View<IconContainerProps>`
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 21px;
  background-color: ${({ background }) => background};
  width: 42px;
  height: 42px;
`;

export const UploadIcon = styled(Feather)`
  font-size: 22px;
`;

export const DetailsContainer = styled.View`
  justify-content: center;
`;

export const UploadName = styled.Text`
  font-size: 15px;
  font-family: 'Gilroy-Medium';
  color: #22215B;
`;

export const UploadDate = styled.Text`
  font-size: 11px;
  font-family: 'Gilroy-Regular';
  color: #22215B;
  opacity: 0.6;
`;

export const UploadSize = styled.Text`
  font-size: 11px;
  font-family: 'Gilroy-Regular';
  color: #22215B;
  opacity: 0.6;
`;
