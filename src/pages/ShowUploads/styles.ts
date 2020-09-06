import styled from 'styled-components/native';
import { Entypo, Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

export const UploadsHeader = styled.View`
  width: 100%;
  padding: 30px 30px;
  flex-direction: row;
  justify-content: space-between;
`;

export const UploadsTitle = styled.Text`
  font-family: 'Gilroy-Semibold';
  font-size: 15px;
  color: #22215B;
`;

export const UploadsIcon = styled(Feather).attrs({
  name: 'trending-up'
})`
  color: #22215B;
  font-size: 20px;
`;

export const UploadsList = styled(FlatList).attrs({
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
  justify-content: space-evenly;
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
