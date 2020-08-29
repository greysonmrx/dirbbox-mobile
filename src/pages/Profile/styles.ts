import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { getBottomSpace } from 'react-native-iphone-x-helper';

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
  align-items: center;
  padding: 0 30px ${getBottomSpace() + 30}px;
`;

export const ProfileCard = styled.View`
  width: 100%;
  margin-top: 40px;
  padding: 20px;
  align-items: center;
  border-radius: 20px;
  background-color: #FFFFFF;
  elevation: 3;
  shadow-color: #000000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.22;
  shadow-radius: 2.22px;
`;

export const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-bottom: 10px;
`;

export const ProfileName = styled.Text`
  color: #22215B;
  font-size: 18px;
  font-family: 'Gilroy-Bold';
  margin-bottom: 5px;
  text-align: center;
`;

export const ProfileEmail = styled.Text`
  color: #22215B;
  font-size: 13px;
  font-family: 'Gilroy-Regular';
  margin-bottom: 10px;
  text-align: center;
`;

export const ProfileDescription = styled.Text`
  color: #22215B;
  font-size: 13px;
  font-family: 'Gilroy-Regular';
  opacity: .6;
  line-height: 18px;
  text-align: center;
`;

export const MyFoldersContainer = styled.View`
  width: 100%;
  padding-top: 40px;
`;

export const MyFoldersHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
`;

export const MyFoldersTitle = styled.Text`
  font-family: 'Gilroy-Semibold';
  color: #22215B;
  font-size: 15px;
  text-transform: capitalize;
`;

export const MyFoldersOptions = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MyFoldersOptionsIcon = styled(Feather)`
  color: #22215B;
  font-size: 20px;
  margin-left: 30px;
`;

export const MyFoldersList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

export const RecentUploadsContainer = styled.View`
  width: 100%;
  padding-top: 20px;
`;

export const RecentUploadsHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
`;

export const RecentUploadsTitle = styled.Text`
  font-family: 'Gilroy-Semibold';
  color: #22215B;
  font-size: 15px;
  text-transform: capitalize;
`;

export const RecentUploadsOptions = styled.View``;

export const RecentUploadsOptionsIcon = styled(Feather).attrs({
  name: 'trending-up'
})`
  color: #22215B;
  font-size: 20px;
`;

export const RecentUploadsList = styled.View`
  width: 100%;
`;
