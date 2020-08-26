import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface InputContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

interface IconProps {
  isFocused: boolean;
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

export const InputContainer = styled.View<InputContainerProps>`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  border-width: 1px;
  border-color: ${(props) =>
    props.isErrored ? 
      '#F45656'
    : props.isFocused ?
      '#22215B'
    :
      '#EEF2FE'
  };
  border-radius: 10px;
  padding: 0 20px;
`;

export const Icon = styled(Feather)<IconProps>`
  margin-right: 16px;
  color: #EEF2FE;
  ${props =>
    (props.isFocused) &&
    css`
      color: #22215B;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #22215B;
  font-size: 16px;
  font-family: 'Gilroy-Medium';
`;

export const ErrorText = styled.Text`
  color: #F45656;
  font-size: 13px;
  font-family: 'Gilroy-Medium';
  margin-top: 5px;
`;

export const ErrorButton = styled.TouchableOpacity`
`;

export const ErrorIcon = styled(Feather).attrs({
  name: "alert-triangle"
})`
  color: #F45656;
  font-size: 20px;
`;