import React from 'react';

import formatDate from '../../utils/formatDate';

import {
  Container,
  TopSide,
  FolderImage,
  OptionButton,
  OptionIcon,
  BottomSide,
  FolderName,
  FolderDate,
} from './styles';

interface FolderProps {
  color?: 'blue' | 'green' | 'yellow' | 'red';
  mode: 'list' | 'grid';
  name: string;
  created_at: Date;
}

interface IColors {
  blue: any;
  yellow: any;
  red: any;
  green: any;
}

const Folder: React.FC<FolderProps> = ({ color = 'blue', name, mode, created_at }) => {
  const folderImages: IColors = {
    blue: require('../../assets/icons/blue_folder.png'),
    yellow: require('../../assets/icons/yellow_folder.png'),
    red: require('../../assets/icons/red_folder.png'),
    green: require('../../assets/icons/green_folder.png')
  }

  const colors: IColors = {
    blue: '#415EB6',
    yellow: '#FFB110',
    red: '#AC4040',
    green: '#23B0B0',
  }

  return (
    <Container color={color} mode={mode}>
      <TopSide>
        <FolderImage source={folderImages[color]} />
        <OptionButton
          onPress={() => {}}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <OptionIcon color={colors[color]}/>
        </OptionButton>
      </TopSide>
      <BottomSide>
        <FolderName color={colors[color]}>{name}</FolderName>
        <FolderDate color={colors[color]}>{formatDate(created_at)}</FolderDate>
      </BottomSide>
    </Container>
  )
}

export default Folder;