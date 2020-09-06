import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import RNButton from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
  background-color: #FFFFFF;
`;

export const ScrollContainer = styled.View`
  flex: 1;
  padding: 0 30px ${getBottomSpace() + 30}px;
`;

export const ItemContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 20px 0;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: rgba(27, 29, 40, 0.08);
`;

export const ItemButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  padding: 20px 0;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: rgba(27, 29, 40, 0.08);
`;

export const ItemContainerText = styled.Text`
  font-size: 16px;
  color: #1B1D28;
  font-family: 'Gilroy-Bold';
  ${Platform.OS === 'ios' && 'height: 16px;'}
`;

export const ItemButtonText = styled.Text`
  font-size: 16px;
  color: #1B1D28;
  font-family: 'Gilroy-Medium';
`;

export const ItemButtonIcon = styled(MaterialIcons).attrs({
  name: 'keyboard-arrow-right'
})`
  color: #1B1D28;
  font-size: 20px;
`;

export const ItemLeftSide = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const ItemContainerIcon = styled(Feather).attrs({
  name: 'help-circle'
})`
  color: #AAAAAA;
  font-size: 15px;
  margin-left: 10px;
`;

export const BottomSheetContent = styled.View`
  width: 100%;
  padding: 30px;
  padding-bottom: 0px;
`;

export const BottomSheetText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: #7B7F9E;
  font-family: 'Gilroy-Medium';
`;

export const Bold = styled.Text`
  font-family: 'Gilroy-Semibold';
`;

export const Button = styled(RNButton)`
  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #FFFFFF;
  font-family: 'Gilroy-Semibold';
`;
