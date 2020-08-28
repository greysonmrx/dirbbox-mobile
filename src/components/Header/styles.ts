import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 60px 30px 25px;
  padding-top: ${Constants.statusBarHeight + 60}px;
  background-color: #FEFEFE;
`;

export const HeaderButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const HeaderIcon = styled(MaterialIcons)`
  color: #22215B;
  font-size: 25px;
`;

export const HeaderTitle = styled.Text`
  font-size: 16px;
  font-family: "Gilroy-Semibold";
  color: #22215B;
  text-transform: capitalize;
`;