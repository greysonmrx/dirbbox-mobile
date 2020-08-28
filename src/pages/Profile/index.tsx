import React from 'react';
import Animated from 'react-native-reanimated';

import Header from '../../components/Header';
import Folder from '../../components/Folder';
import Upload from '../../components/Upload';

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
  const folders: Folder[] = [
    {
      id: 1,
      name: 'Mobile Apps',
      created_at: new Date(),
      color: 'blue'
    },{
      id: 2,
      name: 'SVG Icons',
      created_at: new Date(),
      color: 'yellow'
    },{
      id: 3,
      name: 'Prototypes',
      created_at: new Date(),
      color: 'red'
    },{
      id: 4,
      name: 'Avatars',
      created_at: new Date(),
      color: 'green'
    }
  ];

  const lastUploads: Upload[] = [
    {
      id: 1,
      name: 'Projects.docx',
      created_at: new Date(),
      type: 'docx',
      size: 310,
    },{
      id: 2,
      name: 'profile.png',
      created_at: new Date(),
      type: 'png',
      size: 1826,
    },{
      id: 3,
      name: 'movie.mp4',
      created_at: new Date(),
      type: 'mp4',
      size: 2257832,
    },{
      id: 4,
      name: 'Projects.zip',
      created_at: new Date(),
      type: 'zip',
      size: 2091,
    }
  ];

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
              <ProfileName>Greyson Mascarenhas</ProfileName>
              <ProfileEmail>greysonmrx@gmail.com</ProfileEmail>
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
                      name={folder.name}
                      mode='grid'
                      color={folder.color}
                      created_at={folder.created_at}
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
                  lastUploads.map(upload => (
                    <Upload 
                      name={upload.name}
                      type={upload.type}
                      size={upload.size}
                      created_at={upload.created_at}
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
