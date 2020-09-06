import React, { useRef, useState, useEffect, useCallback } from 'react';
import Animated from 'react-native-reanimated';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert, Keyboard } from 'react-native';
import { getDocumentAsync } from 'expo-document-picker';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { getType } from 'mime';

import Input from '../../components/Input';
import Header from '../../components/Header';
import Upload from '../../components/Upload';
import BottomSheet, { BottomSheetHandles } from '../../components/BottomSheet';
import Modal, { ModalHandles } from '../../components/Modal';

import api from '../../services/api';

import {
  Container,
  UploadsHeader,
  UploadsTitle,
  UploadsIcon,
  UploadsList,
  CreateButton,
  CreateButtonICon,
  BottomSheetContent,
  BottomSheetButton,
  BottomSheetIconContent,
  BottomSheetIcon,
  BottomSheetText,
  ButtonsContainer,
  ModalButton,
  ModalButtonText,
} from './styles';

interface ShowUploadsProps {
  style: {
    borderRadius: Animated.Node<number>;
    transform: {
        scale: Animated.Node<number>;
    }[];
  }
}

const ShowUploads: React.FC<ShowUploadsProps> = ({ style }) => {
  const navigation = useNavigation();
  const { id, name } = useRoute().params as {
    id: number;
    name: string;
  };

  const createUploadBottomSheetRef = useRef<BottomSheetHandles>(null);
  const optionsBottomSheetRef = useRef<BottomSheetHandles>(null);
  const editUploadModalRef = useRef<ModalHandles>(null);
  const editUploadFormRef = useRef<FormHandles>(null);

  const [uploads, setUploads] = useState<Upload[]>([]);
  const [currentUpload, setCurrentUpload] = useState<Upload>();

  const handleShowOptions = useCallback((upload: Upload) => {
    optionsBottomSheetRef.current?.open();
    setCurrentUpload(upload);
  }, [currentUpload, setCurrentUpload]);

  const handleGetUploads = useCallback(async () => {
    try {
      const response = await api.get(`/uploads?folder_id=${id}`);

      setUploads(response.data);
    } catch (err) {
      Alert.alert(
        'Erro ao buscar arquivos', 
        err.response?.data.message || 'Ocorreu um erro ao tentar buscar arquivos.'
      );
    }
  }, [id]);

  const handleGetDocument = useCallback(async () => {
    createUploadBottomSheetRef.current?.close();

    try {
      const response = await getDocumentAsync();

      if (response.type === 'success') {
        const data = new FormData();

        data.append('folder_id', String(id));
        data.append('file', {
          type: getType(response.name),
          uri: response.uri,
          name: response.name,
        });

        await api.post('/uploads', data);

        handleGetUploads();
      }
    } catch (err) {
      Alert.alert(
        'Erro ao enviar arquivo', 
        err.response?.data.message || 'Ocorreu um erro ao tentar enviar arquivo.'
      );
    }
  }, [id]);

  const handleRemoveUpload = useCallback(async () => {
    try {
      await api.delete(`/uploads/${currentUpload?.id}`);

      setUploads(uploads.filter(upload => upload.id !== currentUpload?.id));
    } catch (err) {
      Alert.alert(
        'Erro ao remover arquivo', 
        err.response?.data.message || 'Ocorreu um erro ao tentar remover arquivo.'
      );
    } finally {
      optionsBottomSheetRef.current?.close();
    }
  }, [uploads, currentUpload]);

  const handleEditUpload = useCallback(
    async ({ uploadName }: { uploadName: string; }) => {
    try {
      await api.patch(`/uploads/${currentUpload?.id}`, {
        name: uploadName
      });

      handleGetUploads();
    } catch (err) {
      Alert.alert(
        'Erro ao editar arquivo', 
        err.response?.data.message || 'Ocorreu um erro ao tentar editar arquivo.'
      );
    } finally {
      Keyboard.dismiss();
      editUploadFormRef.current?.reset();
      editUploadModalRef.current?.close();
    }
  }, [currentUpload, id]);

  const handleCancelEditUpload = useCallback(() => {
    Keyboard.dismiss();
    editUploadModalRef.current?.close();
  }, []);

  const handleGoBack = useCallback(() => {
    setUploads([]);
    navigation.goBack();
  }, []);

  useEffect(() => {
    handleGetUploads();
  }, [id]);

  return (
    <>
      <Container
        as={Animated.View}
        style={style}
      >
        <Header 
          title={name}
          onBack={handleGoBack}
        />
        <UploadsHeader>
          <UploadsTitle>Últimos envios</UploadsTitle>
          <UploadsIcon />
        </UploadsHeader>
        <UploadsList 
          data={uploads}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Upload
              id={item.id}
              name={item.name}
              type={item.type}
              size={item.size}
              created_at={item.created_at}
              onShowOptions={handleShowOptions}
            />
          )}
        />
        <CreateButton 
          onPress={() => createUploadBottomSheetRef.current?.open()}
        >
          <CreateButtonICon />
        </CreateButton>
      </Container>
      <BottomSheet
        ref={createUploadBottomSheetRef}
        title="Deseja enviar"
      >
        <BottomSheetContent>
        <BottomSheetButton
            onPress={handleGetDocument}
          >
            <BottomSheetIconContent>
              <BottomSheetIcon name="upload-cloud"/>
            </BottomSheetIconContent>
            <BottomSheetText>Foto ou vídeo</BottomSheetText>
          </BottomSheetButton>
          <BottomSheetButton
            onPress={handleGetDocument}
          >
            <BottomSheetIconContent>
              <BottomSheetIcon name="file-plus"/>
            </BottomSheetIconContent>
            <BottomSheetText>Arquivo</BottomSheetText>
          </BottomSheetButton>
          <BottomSheetButton
            onPress={handleGetDocument}
          >
            <BottomSheetIconContent>
              <BottomSheetIcon name="camera"/>
            </BottomSheetIconContent>
            <BottomSheetText>Usar câmera</BottomSheetText>
          </BottomSheetButton>
        </BottomSheetContent>
      </BottomSheet>
      <BottomSheet
        ref={optionsBottomSheetRef}
        title="Opções"
      >
        <BottomSheetContent>
          <BottomSheetButton
            onPress={() => editUploadModalRef.current?.open()}
          >
            <BottomSheetIconContent>
              <BottomSheetIcon name="edit-2"/>
            </BottomSheetIconContent>
            <BottomSheetText>Renomear</BottomSheetText>
          </BottomSheetButton>
          <BottomSheetButton
            onPress={handleRemoveUpload}
          >
            <BottomSheetIconContent>
              <BottomSheetIcon name="trash-2"/>
            </BottomSheetIconContent>
            <BottomSheetText>Remover</BottomSheetText>
          </BottomSheetButton>
        </BottomSheetContent>
      </BottomSheet>
      <Modal 
        ref={editUploadModalRef}
        title="Editar arquivo"        
      >
        <Form
          ref={editUploadFormRef}
          onSubmit={handleEditUpload}          
        >
          <Input 
            name='uploadName'
            placeholder="Nome do arquivo"
            defaultValue={currentUpload?.name}
            returnKeyType="send"
            onSubmitEditing={() => editUploadFormRef.current?.submitForm()}
          />
          <ButtonsContainer>
            <ModalButton
              onPress={handleCancelEditUpload}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <ModalButtonText>Cancelar</ModalButtonText>
            </ModalButton>
            <ModalButton
              onPress={() => editUploadFormRef.current?.submitForm()}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <ModalButtonText>Editar</ModalButtonText>
            </ModalButton>
          </ButtonsContainer>
        </Form>
      </Modal>
    </>
  );
}

export default ShowUploads;