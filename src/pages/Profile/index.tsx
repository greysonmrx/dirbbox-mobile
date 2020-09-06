import React, { useState, useEffect, useCallback } from 'react';
import Animated from 'react-native-reanimated';
import { Alert } from 'react-native';

import Header from '../../components/Header';
import Folder from '../../components/Folder';
import Upload from '../../components/Upload';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import profileImg from '../../assets/profile.png';

import { 
  Container,
  Scroll,
  ScrollContainer,
  ProfileCard,
  ProfileImage,
  ProfileName,
  ProfileEmail,
  ProfileDescription,
  MyFoldersContainer,
  MyFoldersTitle,
  MyFoldersHeader,
  MyFoldersOptions,
  MyFoldersOptionsIcon,
  MyFoldersList,
  RecentUploadsContainer,
  RecentUploadsHeader,
  RecentUploadsTitle,
  RecentUploadsOptions,
  RecentUploadsOptionsIcon,
  RecentUploadsList,
} from './styles';

interface ProfileProps {
  style: {
    borderRadius: Animated.Node<number>;
    transform: {
        scale: Animated.Node<number>;
    }[];
  }
}

const Profile: React.FC<ProfileProps> = ({ style }) => {
  const { user } = useAuth();

  const name = `${user.name.split(' ')[0]} ${user.name.split(' ')[1]}`;

  const [folders, setFolders] = useState<Folder[]>([]);
  const [uploads, setUploads] = useState<Upload[]>([]);

  const handleGetFolders = useCallback(async () => {
    try {
      const response = await api.get('/folders?limit=4');

      setFolders(response.data);
    } catch (err) {
      Alert.alert(
        'Erro ao buscar pastas', 
        err.response?.data.message || 'Ocorreu um erro ao tentar buscar pastas.'
      );
    } 
  }, []);

  const handleGetUploads = useCallback(async () => {
    try {
      const response = await api.get('/uploads/4');

      setUploads(response.data);
    } catch (err) {
      Alert.alert(
        'Erro ao buscar arquivos', 
        err.response?.data.message || 'Ocorreu um erro ao tentar buscar arquivos.'
      );
    }
  }, []);

  useEffect(() => {
    handleGetFolders();
    handleGetUploads();
  }, []);

  return (
      <Container 
        style={style}
        as={Animated.View}
      >
        <Header title="Meu Perfil"/>
        <Scroll>
          <ScrollContainer>
            <ProfileCard>
              <ProfileImage source={profileImg}/>
              <ProfileName>{name}</ProfileName>
              <ProfileEmail>{user.email}</ProfileEmail>
              <ProfileDescription>Você está utilizando a melhor plataforma de armazenamento de arquivos em nuvem para gerenciar seus dados.</ProfileDescription>
            </ProfileCard>
            <MyFoldersContainer>
              <MyFoldersHeader>
                <MyFoldersTitle>Minhas Pastas</MyFoldersTitle>
                <MyFoldersOptions>
                  <MyFoldersOptionsIcon name="plus"/>
                  <MyFoldersOptionsIcon name="sliders"/>
                </MyFoldersOptions>
              </MyFoldersHeader>
              <MyFoldersList>
                {
                  folders.map(folder => (
                    <Folder 
                      key={folder.id}
                      id={folder.id}
                      name={folder.name}
                      mode='grid'
                      color={folder.color}
                      created_at={folder.created_at}
                      onShowOptions={() => Alert.alert('Show all options')}
                      onShowUploads={() => Alert.alert('Show all uploads')}
                    />
                  ))
                }
              </MyFoldersList>
            </MyFoldersContainer>
            <RecentUploadsContainer>
              <RecentUploadsHeader>
                <RecentUploadsTitle>Últimos Envios</RecentUploadsTitle>
                <RecentUploadsOptions>
                  <RecentUploadsOptionsIcon />
                </RecentUploadsOptions>
              </RecentUploadsHeader>
              <RecentUploadsList>
                {
                  uploads.map(upload => (
                    <Upload 
                      key={upload.id}
                      id={upload.id}
                      name={upload.name}
                      type={upload.type}
                      size={upload.size}
                      created_at={upload.created_at}
                      onShowOptions={() => Alert.alert('Show all options')}
                    />
                  ))
                }
              </RecentUploadsList>
            </RecentUploadsContainer>
          </ScrollContainer>
        </Scroll>
      </Container>
  );
}

export default Profile;
