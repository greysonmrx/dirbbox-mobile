import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0 30px;
`;

export const Wrapper = styled.KeyboardAvoidingView`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  width: 100%;
  align-items: center;
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 15px;
`;

export const Title = styled.Text`
  font-family: 'Gilroy-Semibold';
  font-size: 15px;
  color: #22215B;
  margin-bottom: 20px;
`;