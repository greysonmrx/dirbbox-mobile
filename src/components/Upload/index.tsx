import React from 'react';
import { parseISO } from 'date-fns';

import formatDate from '../../utils/formatDate';
import formatSize from '../../utils/formatSize';

import {
  Container,
  Content,
  IconContainer,
  UploadIcon,
  DetailsContainer,
  UploadName,
  UploadDate,
  UploadSize,
} from './styles';

interface Type {
  icon: string;
  color: string;
  background: string;
}

interface Types {
  programming: Type;
  image: Type;
  video: Type;
  document: Type;
  other: Type;
}

interface UploadProps extends Upload{
  onShowOptions(ulpload: Upload): void;
}

const Upload: React.FC<UploadProps> = ({ id, name, size, type, created_at, onShowOptions }) => {
  const types: Types = {
    programming: {
      icon: 'code',
      color: '#22215B',
      background: 'rgba(34, 33, 91, 0.07)',
    },
    image: {
      icon: 'image',
      color: '#FFC700',
      background: 'rgba(255, 199, 0, 0.07)',
    },
    video: {
      icon: 'film',
      color: '#4CE364',
      background: 'rgba(76, 227, 100, 0.1)',
    },
    document: {
      icon: 'file-text',
      color: '#567DF4',
      background: 'rgba(86, 125, 244, 0.07)',
    },
    other: {
      icon: 'file',
      color: '#FF842B',
      background: 'rgba(255, 132, 43, 0.07)',
    },
  };

  return (
    <Container
      onPress={() => onShowOptions({ id, name, type, size, created_at })}
    >
      <Content>
        <IconContainer background={types[type].background}>
          <UploadIcon 
            name={types[type].icon}
            color={types[type].color}
          />
        </IconContainer>
        <DetailsContainer>
          <UploadName>{name}</UploadName>
          <UploadDate>{formatDate(parseISO(created_at))}</UploadDate>
        </DetailsContainer>
      </Content>
      <UploadSize>{formatSize(size)}</UploadSize>
    </Container>
  );
}

export default Upload;