import React, { useState } from 'react';
import Animated from 'react-native-reanimated';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Form } from "@unform/mobile";

import Input from '../../components/Input';
import Folder from '../../components/Folder';
import BottomSheet from '../../components/BottomSheet';

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

  const [mode, setMode] = useState<'grid' | 'list'>('grid');
  const [createNew, setCreateNew] = useState<boolean>(false);
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
    },{
      id: 5,
      name: 'Design',
      created_at: new Date(),
      color: 'blue'
    },{
      id: 6,
      name: 'Portfolio',
      created_at: new Date(),
      color: 'yellow'
    },{
      id: 7,
      name: 'References',
      created_at: new Date(),
      color: 'red'
    },{
      id: 8,
      name: 'Clients',
      created_at: new Date(),
      color: 'green'
    },{
      id: 9,
      name: 'Mobile Apps',
      created_at: new Date(),
      color: 'blue'
    },{
      id: 10,
      name: 'SVG Icons',
      created_at: new Date(),
      color: 'yellow'
    },
  ];

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
          <Form onSubmit={() => {}}>
            <Input 
              name='search'
              placeholder="Procurar pasta"
              returnKeyType="send"
              icon="search"
              onSubmitEditing={() => {}}
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
              name={item.name}
              created_at={item.created_at}
              color={item.color}
              mode={mode}
            />
          )}
        />
        <CreateButton onPress={() => setCreateNew(true)}>
          <CreateButtonICon />
        </CreateButton>
      </Container>
      <BottomSheet 
        show={createNew}
        onClose={() => setCreateNew(false)}
      >
        <BottomSheetContent>
          <BottomSheetButton>
            <BottomSheetIconContent>
              <BottomSheetIcon name="folder"/>
            </BottomSheetIconContent>
            <BottomSheetText>Pasta</BottomSheetText>
          </BottomSheetButton>
          <BottomSheetButton>
            <BottomSheetIconContent>
              <BottomSheetIcon name="upload-cloud"/>
            </BottomSheetIconContent>
            <BottomSheetText>Fazer upload</BottomSheetText>
          </BottomSheetButton>
          <BottomSheetButton>
            <BottomSheetIconContent>
              <BottomSheetIcon name="camera"/>
            </BottomSheetIconContent>
            <BottomSheetText>Usar camêra</BottomSheetText>
          </BottomSheetButton>
        </BottomSheetContent>
      </BottomSheet>
    </>
  );
}

export default Home;
