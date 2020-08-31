import React from 'react';

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

const Upload: React.FC<Upload> = ({ name, size, type, created_at }) => {
  return (
    <Container>
      <Content>
        <IconContainer>
          <UploadIcon name="file-text"/>
        </IconContainer>
        <DetailsContainer>
          <UploadName>{name}</UploadName>
          <UploadDate>{formatDate(created_at)}</UploadDate>
        </DetailsContainer>
      </Content>
      <UploadSize>{formatSize(size)}</UploadSize>
    </Container>
  );
}

export default Upload;