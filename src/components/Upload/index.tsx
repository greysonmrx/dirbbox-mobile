import React from 'react';

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
          <UploadDate>10 de dez de 2020</UploadDate>
        </DetailsContainer>
      </Content>
      <UploadSize>{size}kb</UploadSize>
    </Container>
  );
}

export default Upload;