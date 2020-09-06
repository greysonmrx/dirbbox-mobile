import React from 'react';
import { parseISO } from 'date-fns';

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

interface FolderProps extends Folder{
  mode: 'list' | 'grid';
  onShowUploads(folder: Folder): void;
  onShowOptions(folder: Folder): void;
}

interface IColors {
  blue: string;
  yellow: string;
  red: string;
  green: string;
}

const Folder: React.FC<FolderProps> = ({ 
  id, color = 'blue', name, mode, created_at, onShowUploads, onShowOptions
}) => {
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
    <Container 
      color={color}
      mode={mode}
      onPress={() => onShowUploads({ id, name, color, created_at })}
    >
      <TopSide>
        <FolderImage source={folderImages[color]} />
        <OptionButton
          onPress={() => onShowOptions({ id, name, color, created_at })}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <OptionIcon color={colors[color]}/>
        </OptionButton>
      </TopSide>
      <BottomSide>
        <FolderName color={colors[color]}>{name}</FolderName>
        <FolderDate color={colors[color]}>{formatDate(parseISO(created_at))}</FolderDate>
      </BottomSide>
    </Container>
  )
}

export default Folder;