import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { FontAwesome } from "@expo/vector-icons";
import { Platform } from 'react-native';

interface ItemProps {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-bottom: ${getBottomSpace() + 30}px;
  background: transparent;
`;

export const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 30px;
  padding-top: ${Constants.statusBarHeight + 30}px;
  background-color: #FFFFFF;
  justify-content: center;
  align-items: center;
  border-bottom-right-radius: 50px;
`;

export const ProfileImage = styled.Image`
  width: 45px;
  height: 45px;
`;

export const ProfileInfo = styled.View`
  margin-left: 10px;
`;

export const ProfileName = styled.Text`
  font-size: 18px;
  color: #1B1D28;
  font-family: 'Gilroy-Semibold';
`;

export const ProfileEmail = styled.Text`
  font-size: 12px;
  color: #7B7F9E;
  font-family: 'Gilroy-Regular';
`;

export const ItemsContainer = styled.View`

`;

export const ItemButton = styled.TouchableOpacity<ItemProps>`
  border-left-width: 4px;
  border-left-color: ${({ isSelected }) => isSelected ? '#567DF4' : 'transparent'};
  padding: 6px 0;
  padding-left: 26px;
  margin-bottom: 15px;
`;

export const ItemLabel = styled.Text<ItemProps>`
  font-size: 16px;
  font-family: ${({ isSelected }) => isSelected ? 'Gilroy-Bold' : 'Gilroy-Medium'};
  color: #1B1D28;
`;

export const BottomContainer = styled.View`
  padding-left: 30px;
`;

export const LogOutButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-bottom: 60px;
`;

export const LogOutIcon = styled(FontAwesome).attrs({
  name: 'power-off'
})`
  margin-right: 8px;
  color: #1B1D28;
  font-size: 20px;
`;

export const LogOutText = styled.Text`
  font-size: 16px;
  font-family: 'Gilroy-Bold';
  color: #1B1D28;
  margin-top: ${Platform.OS === 'ios' ? 6 : 0}px;
`;

export const Version = styled.Text`
  font-size: 10px;
  font-family: 'Gilroy-Medium';
  color: #3A4276;
`;
