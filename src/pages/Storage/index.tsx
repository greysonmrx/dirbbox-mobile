import React from 'react';
import Animated from 'react-native-reanimated';

import ProgressBar from '../../components/ProgressBar';
import Doughnut from '../../components/Doughnut';
import Header from '../../components/Header';

import formatSize from '../../utils/formatSize';

import { 
  Container,
  Scroll,
  ScrollContainer,
  StorageDetails,
  StorageDetailsTitle,
  StorageSize,
  StorageTotal,
  FilesTypesDetails,
  FileTypeContainer,
  FirstContent,
  Ball,
  FileTypeContent,
  FileTypeName,
  FileTypeSize,
} from './styles';

interface StorageProps {
  style: {
    borderRadius: Animated.Node<number>;
    transform: {
        scale: Animated.Node<number>;
    }[];
  }
}

const Storage: React.FC<StorageProps> = ({ style }) => {
  const storage = {
    total: 31000000,
    remaining: 11160000,
    data: [ 7.34, 3.30, 2.06, 6.66]
  }

  return (
    <Container 
      style={style}
      as={Animated.View}
    >
      <Header title="Armazenamento"/>
      <Scroll>
        <ScrollContainer>
          <Doughnut data={storage.data}/>
          <StorageDetails>
            <StorageDetailsTitle>Disponível</StorageDetailsTitle>
            <StorageSize>{formatSize(storage.remaining, 2)}</StorageSize>
            <StorageTotal>Total {formatSize(storage.total)}</StorageTotal>
          </StorageDetails>
        </ScrollContainer>
        <FilesTypesDetails>
          <FileTypeContainer>
            <FirstContent>
              <Ball color="#22215B"/>
              <FileTypeContent>
                <FileTypeName>Programação</FileTypeName>
                <FileTypeSize>7.34 GB</FileTypeSize>
              </FileTypeContent>
            </FirstContent>
            <ProgressBar 
              color="#22215B"
              progress={36}
            />
          </FileTypeContainer>
          <FileTypeContainer>
            <FirstContent>
              <Ball color="#FFC700"/>
              <FileTypeContent>
                <FileTypeName>Imagens</FileTypeName>
                <FileTypeSize>6.66 GB</FileTypeSize>
              </FileTypeContent>
            </FirstContent>
            <ProgressBar 
              color="#FFC700" 
              progress={20}
            />
          </FileTypeContainer>
          <FileTypeContainer>
            <FirstContent>
              <Ball color="#4CE364"/>
              <FileTypeContent>
                <FileTypeName>Vídeos</FileTypeName>
                <FileTypeSize>38.66 GB</FileTypeSize>
              </FileTypeContent>
            </FirstContent>
            <ProgressBar 
              color="#4CE364" 
              progress={8}
            />
          </FileTypeContainer>
          <FileTypeContainer>
            <FirstContent>
              <Ball color="#567DF4"/>
              <FileTypeContent>
                <FileTypeName>Documentos</FileTypeName>
                <FileTypeSize>38.66 GB</FileTypeSize>
              </FileTypeContent>
            </FirstContent>
            <ProgressBar 
              color="#567DF4" 
              progress={34}
            />
          </FileTypeContainer>
          <FileTypeContainer>
            <FirstContent>
              <Ball color="#FF842A"/>
              <FileTypeContent>
                <FileTypeName>Outros</FileTypeName>
                <FileTypeSize>38.66 GB</FileTypeSize>
              </FileTypeContent>
            </FirstContent>
            <ProgressBar 
              color="#FF842A" 
              progress={12}
            />
          </FileTypeContainer>
        </FilesTypesDetails>
      </Scroll>
    </Container>
  );
}

export default Storage;
