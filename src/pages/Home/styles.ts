import styled from 'styled-components/native';
import Constants from 'expo-constants';
import { FlatList } from 'react-native';
import { Feather, FontAwesome, Entypo } from '@expo/vector-icons';
import { getBottomSpace } from 'react-native-iphone-x-helper';

interface ViewModeIcon {
  isSelected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  padding-top: ${Constants.statusBarHeight + 57}px;
`;

export const Header = styled.View`
  padding: 0 30px;
  padding-bottom: 30px;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const Title = styled.Text`
  font-family: 'Gilroy-Semibold';
  font-size: 24px;
  color: #22215B;
`;

export const MenuButton = styled.TouchableOpacity``;

export const MenuButtonIcon = styled(Feather).attrs({
  name: 'align-left'
})`
  font-size: 28px;
`;

export const OptionsContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FilterText = styled.Text`
  font-family: 'Gilroy-Semibold';
  font-size: 15px;
  color: #22215B;
  margin-right: 10px;
`;

export const FilterIcon = styled(FontAwesome).attrs({
  name: 'angle-down'
})`
  font-size: 25px;
`;

export const ViewModeContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ViewModeButton = styled.TouchableOpacity``;

export const ViewModeIcon = styled(Feather)<ViewModeIcon>`
  margin-left: 20px;
  font-size: 20px;
  color: ${({ isSelected }) => isSelected ? "#22215B": "#B0C0D0"};
`;

export const FoldersList = styled(FlatList).attrs({
  contentContainerStyle: {
    paddingHorizontal: 30,
    paddingBottom: getBottomSpace(),
  },
})``;

export const CreateButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 60px;
  right: 30px;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #22215B;
  border-radius: 30px;
  elevation: 5;
  shadow-color: #000000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const CreateButtonICon = styled(Entypo).attrs({
  name: 'plus'
})`
  font-size: 20px;
  color: #FFFFFF;
`;

export const BottomSheetContent = styled.View`
  width: 100%;
  padding: 25px 30px 5px;
  flex-direction: row;
  justify-content: space-between;
`;

export const BottomSheetButton = styled.TouchableOpacity`
  align-items: center;
  width: 33%;
`;

export const BottomSheetIconContent = styled.View`
  border: 1px solid #EEF2FE;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  padding: 12px;
  width: 45px;
  height: 45px;
  margin-bottom: 10px;
`;

export const BottomSheetIcon = styled(Feather)`
  color: #7B7F9E;
  font-size: 18px;
`;

export const BottomSheetText = styled.Text`
  color: #7B7F9E;
  font-size: 12px;
  font-family: 'Gilroy-Semibold';
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

export const ModalButton = styled.TouchableOpacity`
  padding: 0 15px;
`;

export const ModalButtonText = styled.Text`
  font-family: 'Gilroy-Semibold';
  font-size: 12px;
  color: #567DF4;
`;
