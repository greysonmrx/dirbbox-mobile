import React, { useRef, useState, useEffect, useCallback } from 'react';
import Animated from 'react-native-reanimated';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from "@unform/mobile";
import { Alert, Keyboard } from 'react-native';

import Input from '../../components/Input';
import Folder from '../../components/Folder';
import ColorPicker, { ColorPickerHandles } from '../../components/ColorPicker';
import BottomSheet, { BottomSheetHandles } from '../../components/BottomSheet';
import Modal, { ModalHandles } from '../../components/Modal';

import api from '../../services/api';

import { 
  Container,
  Header,
  Content,
  Title,
  MenuButton,
  MenuButtonIcon,
  OptionsContainer,
  FilterContainer,
  FilterText,
  FilterIcon,
  ViewModeContainer,
  ViewModeButton,
  ViewModeIcon,
  FoldersList,
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

interface HomeProps {
  style: {
    borderRadius: Animated.Node<number>;
    transform: {
        scale: Animated.Node<number>;
    }[];
  }
}

const Home: React.FC<HomeProps> = ({ style }) => {
  const navigation = useNavigation();

  const modalCreateFolderRef = useRef<ModalHandles>(null);
  const colorPickerCreateFolderRef = useRef<ColorPickerHandles>(null); 
  const modalEditFolderRef = useRef<ModalHandles>(null);
  const colorPickerEditFolderRef = useRef<ColorPickerHandles>(null); 
  const bottomSheetRef = useRef<BottomSheetHandles>(null);
  const createFolderFormRef = useRef<FormHandles>(null);
  const editFolderFormRef = useRef<FormHandles>(null);
  const searchFoldersFormRef = useRef<FormHandles>(null);

  const [folders, setFolders] = useState<Folder[]>([]);
  const [currentFolder, setCurrentFolder] = useState<Folder>();
  const [mode, setMode] = useState<'grid' | 'list'>('grid');

  const handleShowOptions = useCallback((folder: Folder) => {
    bottomSheetRef.current?.open();
    setCurrentFolder(folder);
  }, [currentFolder]);

  const handleGetFolders = useCallback(async () => {
    try {
      const response = await api.get('/folders');

      setFolders(response.data);
    } catch (err) {
      Alert.alert(
        'Erro ao buscar pastas', 
        err.response?.data.message || 'Ocorreu um erro ao tentar buscar pastas.'
      );
    }
  }, []);

  const handleSearchFolders = useCallback(
    async ({ search }: { search: string; }) => {
      try {
        const response = await api.get(`/folders?search=${search}`);

        setFolders(response.data);
      } catch (err) {
        Alert.alert(
          'Erro ao procurar pasta', 
          err.response?.data.message || 'Ocorreu um erro ao tentar procurar pasta.'
        );
      }
  }, []);

  const handleCancelCreateFolder = useCallback(() => {
    Keyboard.dismiss();
    createFolderFormRef.current?.reset();
    modalCreateFolderRef.current?.close();
  }, []);

  const handleCreateFolder = useCallback(
    async ({ folderName }: { folderName: string; }) => {
      try {
        await api.post('/folders', {
          name: folderName,
          color: colorPickerCreateFolderRef.current?.getColor(),
        });

        handleGetFolders();
      } catch (err) {
        Alert.alert(
          'Erro ao criar pasta', 
          err.response?.data.message || 'Ocorreu um erro ao tentar criar pasta.'
        );
      } finally {
        Keyboard.dismiss();
        createFolderFormRef.current?.reset();
        modalCreateFolderRef.current?.close();
      }
  }, []);

  const handleCancelEditFolder = useCallback(() => {
    Keyboard.dismiss();
    modalEditFolderRef.current?.close();
  }, []);

  const handleEditFolder = useCallback(
    async ({ folderName }: { folderName: string; }) => {
      try {
        await api.put(`/folders/${currentFolder?.id}`, {
          name: folderName,
          color: colorPickerEditFolderRef.current?.getColor(),
        });

        handleGetFolders();
      } catch (err) {
        Alert.alert(
          'Erro ao editar pasta', 
          err.response?.data.message || 'Ocorreu um erro ao tentar editar pasta.'
        );
      } finally {
        Keyboard.dismiss();
        editFolderFormRef.current?.reset();
        modalEditFolderRef.current?.close();
      }
  }, []);

  const handleRemoveFolder = useCallback(async () => {
      try {
        await api.delete(`/folders/${currentFolder?.id}`);

        setFolders(folders.filter(folder => folder.id !== currentFolder?.id));
      } catch (err) {
        Alert.alert(
          'Erro ao remover pasta', 
          err.response?.data.message || 'Ocorreu um erro ao tentar remover pasta.'
        );
      } finally {
        bottomSheetRef.current?.close();
      }
  }, [currentFolder]);

  useEffect(() => {
    handleGetFolders();
  }, []);

  return (
    <>
      <Container
        style={style}
        as={Animated.View}
      >
        <Header>
          <Content>
            <Title>Seu Dirbbox</Title>
            <MenuButton 
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <MenuButtonIcon />
            </MenuButton>
          </Content>
          <Form 
            ref={searchFoldersFormRef}
            onSubmit={handleSearchFolders}
          >
            <Input 
              name='search'
              placeholder="Procurar pasta"
              returnKeyType="send"
              icon="search"
              onSubmitEditing={() => searchFoldersFormRef.current?.submitForm()}
            />
          </Form>
          <OptionsContainer>
            <FilterContainer>
              <FilterText>Recente</FilterText>
              <FilterIcon />
            </FilterContainer>
            <ViewModeContainer>
              <ViewModeButton
                onPress={() => setMode('list')}
              >
                <ViewModeIcon 
                  name="menu"
                  isSelected={mode === 'list'}
                />
              </ViewModeButton>
              <ViewModeButton
                onPress={() => setMode('grid')}
              >
                <ViewModeIcon 
                  name="grid"
                  isSelected={mode === 'grid'}
                />
              </ViewModeButton>
            </ViewModeContainer>
          </OptionsContainer>
        </Header>
        <FoldersList 
          key={mode}
          data={folders}
          keyExtractor={(item) => String(item.id)}
          numColumns={mode === 'grid' ? 2 : 1}
          columnWrapperStyle={mode === 'grid' ? {
            justifyContent: "space-between"
          }: null}
          renderItem={({ item }) => (
            <Folder
              id={item.id}
              name={item.name}
              created_at={item.created_at}
              color={item.color}
              mode={mode}
              onShowUploads={() => navigation.navigate('ShowUploads', { id: item.id, name: item.name })}
              onShowOptions={handleShowOptions}
            />
          )}
        />
        <CreateButton onPress={() => modalCreateFolderRef.current?.open()}>
          <CreateButtonICon />
        </CreateButton>
      </Container>
      <Modal 
        ref={modalCreateFolderRef}
        title="Nova pasta"
      >
        <Form
          ref={createFolderFormRef}
          onSubmit={handleCreateFolder}
        >
          <Input 
            name='folderName'
            placeholder="Nome da pasta"
            returnKeyType="send"
            onSubmitEditing={() => createFolderFormRef.current?.submitForm()}
          />
          <ColorPicker ref={colorPickerCreateFolderRef} />
          <ButtonsContainer>
            <ModalButton
              onPress={handleCancelCreateFolder}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <ModalButtonText>Cancelar</ModalButtonText>
            </ModalButton>
            <ModalButton
              onPress={() => createFolderFormRef.current?.submitForm()}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <ModalButtonText>Criar</ModalButtonText>
            </ModalButton>
          </ButtonsContainer>
        </Form>
      </Modal>
      <Modal 
        ref={modalEditFolderRef}
        title="Editar pasta"
      >
        <Form
          ref={editFolderFormRef}
          onSubmit={handleEditFolder}
        >
          <Input 
            name='folderName'
            placeholder="Nome da pasta"
            defaultValue={currentFolder?.name}
            returnKeyType="send"
            onSubmitEditing={() => editFolderFormRef.current?.submitForm()}
          />
          <ColorPicker 
            ref={colorPickerEditFolderRef}
            defaultValue={currentFolder?.color}
          />
          <ButtonsContainer>
            <ModalButton
              onPress={handleCancelEditFolder}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <ModalButtonText>Cancelar</ModalButtonText>
            </ModalButton>
            <ModalButton
              onPress={() => editFolderFormRef.current?.submitForm()}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <ModalButtonText>Editar</ModalButtonText>
            </ModalButton>
          </ButtonsContainer>
        </Form>
      </Modal>
      <BottomSheet 
        ref={bottomSheetRef}
        title="Opções"
      >
        <BottomSheetContent>
          <BottomSheetButton
            onPress={() => bottomSheetRef.current?.close()}
          >
            <BottomSheetIconContent>
              <BottomSheetIcon name="eye"/>
            </BottomSheetIconContent>
            <BottomSheetText>Ver arquivos</BottomSheetText>
          </BottomSheetButton>
          <BottomSheetButton
            onPress={() => {
              bottomSheetRef.current?.close();
              modalEditFolderRef.current?.open();
            }}
          >
            <BottomSheetIconContent>
              <BottomSheetIcon name="edit-2"/>
            </BottomSheetIconContent>
            <BottomSheetText>Editar</BottomSheetText>
          </BottomSheetButton>
          <BottomSheetButton
            onPress={handleRemoveFolder}
          >
            <BottomSheetIconContent>
              <BottomSheetIcon name="trash-2"/>
            </BottomSheetIconContent>
            <BottomSheetText>Remover</BottomSheetText>
          </BottomSheetButton>
        </BottomSheetContent>
      </BottomSheet>
    </>
  );
}

export default Home;
