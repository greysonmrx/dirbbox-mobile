import React, { useState, useCallback, useEffect } from 'react';
import Animated from 'react-native-reanimated';
import { Alert } from 'react-native';

import ProgressBar from '../../components/ProgressBar';
import Doughnut from '../../components/Doughnut';
import Header from '../../components/Header';

import api from '../../services/api';

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
  RefreshDataButton,
  RefreshDataButtonText,
} from './styles';

interface Storage {
  total: number;
  remaining: number;
  data: number[];
}

interface StorageProps {
  style: {
    borderRadius: Animated.Node<number>;
    transform: {
        scale: Animated.Node<number>;
    }[];
  }
}

const Storage: React.FC<StorageProps> = ({ style }) => {
  const [storage, setStorage] = useState<Storage>();

  const handleGetStorage = useCallback(async () => {
    try {
      const response = await api.get('/storage');

      setStorage(response.data);
      console.log(response.data);
    } catch (err) {
      Alert.alert(
        'Erro ao buscar armazenamento',
        err.response?.data.message || 'Ocorreu um erro ao tentar buscar armazenamento.'
      );
    }
  }, []);

  useEffect(() => {
    handleGetStorage();
  }, []);

  if (!storage?.total) {
    return null;
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
                <FileTypeSize>
                  {
                    storage.data[0] 
                      ? formatSize(storage.data[0], 2)
                      : "0.00 Bytes"
                  }
                </FileTypeSize>
              </FileTypeContent>
            </FirstContent>
            <ProgressBar 
              color="#22215B"
              progress={storage.data[0] / storage.total * 100}
            />
          </FileTypeContainer>
          <FileTypeContainer>
            <FirstContent>
              <Ball color="#FFC700"/>
              <FileTypeContent>
                <FileTypeName>Imagens</FileTypeName>
                <FileTypeSize>
                  {
                    storage.data[1] 
                      ? formatSize(storage.data[1], 2)
                      : "0.00 Bytes"
                  }
                </FileTypeSize>
              </FileTypeContent>
            </FirstContent>
            <ProgressBar 
              color="#FFC700" 
              progress={storage.data[1] / storage.total * 100}
            />
          </FileTypeContainer>
          <FileTypeContainer>
            <FirstContent>
              <Ball color="#4CE364"/>
              <FileTypeContent>
                <FileTypeName>Vídeos</FileTypeName>
                <FileTypeSize>
                  {
                    storage.data[2] 
                      ? formatSize(storage.data[2], 2)
                      : "0.00 Bytes"
                  }
                </FileTypeSize>
              </FileTypeContent>
            </FirstContent>
            <ProgressBar 
              color="#4CE364" 
              progress={storage.data[2] / storage.total * 100}
            />
          </FileTypeContainer>
          <FileTypeContainer>
            <FirstContent>
              <Ball color="#567DF4"/>
              <FileTypeContent>
                <FileTypeName>Documentos</FileTypeName>
                <FileTypeSize>
                  {
                    storage.data[3] 
                      ? formatSize(storage.data[3], 2)
                      : "0.00 Bytes"
                  }
                </FileTypeSize>
              </FileTypeContent>
            </FirstContent>
            <ProgressBar 
              color="#567DF4" 
              progress={storage.data[3] / storage.total * 100}
            />
          </FileTypeContainer>
          <FileTypeContainer>
            <FirstContent>
              <Ball color="#FF842A"/>
              <FileTypeContent>
                <FileTypeName>Outros</FileTypeName>
                <FileTypeSize>
                  {
                    storage.data[4] 
                      ? formatSize(storage.data[4], 2)
                      : "0.00 Bytes"
                  }
                </FileTypeSize>
              </FileTypeContent>
            </FirstContent>
            <ProgressBar 
              color="#FF842A" 
              progress={storage.data[4] / storage.total * 100}
            />
          </FileTypeContainer>
        </FilesTypesDetails>
        <RefreshDataButton 
          type="text"
          onPress={handleGetStorage}
        >
          <RefreshDataButtonText>Atualizar dados</RefreshDataButtonText>
        </RefreshDataButton>
      </Scroll>
    </Container>
  );
}

export default Storage;
