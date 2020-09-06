import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import Button from '../../components/Button';

interface BallProps {
  color: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
  align-items: center;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
`;

export const ScrollContainer = styled.View`
  flex: 1;
`;

export const StorageDetails = styled.View`
  width: 100%;
  padding: 10px 30px 30px;
  align-items: center;
`;

export const StorageDetailsTitle = styled.Text`
  font-size: 20px;
  font-family: "Gilroy-Regular";
  color: #22215B;
  margin-bottom: 8px;
  text-align: center;
`;

export const StorageSize = styled.Text`
  font-size: 24px;
  font-family: "Gilroy-Bold";
  color: #22215B;
  margin-bottom: 8px;
  text-align: center;
`;

export const StorageTotal = styled.Text`
  font-size: 20px;
  font-family: "Gilroy-Regular";
  color: #22215B;
`;

export const FilesTypesDetails = styled.View`
  padding: 30px 30px 0;
`;

export const FileTypeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const FirstContent = styled.View`
  flex-direction: row;
`;

export const Ball = styled.View<BallProps>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
  margin-right: 10px;
`;

export const FileTypeContent = styled.View`
  align-items: flex-start;
`;

export const FileTypeName = styled.Text`
  font-size: 18px;
  font-family: 'Gilroy-Medium';
  color: #22215B;
  margin-bottom: 5px;
  line-height: 17px;
`;

export const FileTypeSize = styled.Text`
  font-size: 12px;
  font-family: 'Gilroy-Medium';
  color: #22215B;
  opacity: 0.6;
`;

export const RefreshDataButton = styled(Button)`
  margin-bottom: ${getBottomSpace() + 20}px;
`;

export const RefreshDataButtonText = styled.Text`
  font-size: 16px;
  color: #1B1D28;
  font-family: 'Gilroy-Regular';
`;