import React from 'react';

import { 
  Container,
  Label,
  BoxesContainer,
  BoxContainer,
  BoxIcon,
  BoxText,  
} from './styles';

interface ToggleBox {
  label?: string;
  value: number;
  onChange(value: number): void;
}

const ToggleBox: React.FC<ToggleBox> = ({ label, value, onChange }) => {
  return (
    <Container>
      {
        label && <Label>{label}</Label>
      }
      <BoxesContainer>
        <BoxContainer 
          isSelected={value === 10}
          onPress={() => onChange(10)}
        >
          <BoxIcon 
            isSelected={value === 10} 
            name="save"
          />
          <BoxText isSelected={value === 10}>10 GB</BoxText>
        </BoxContainer>
        <BoxContainer 
          isSelected={value === 25}
          onPress={() => onChange(25)}
        >
          <BoxIcon 
            isSelected={value === 25} 
            name="server"
          />
          <BoxText isSelected={value === 25}>25 GB</BoxText>
        </BoxContainer>
      </BoxesContainer>
    </Container>
  );
}

export default ToggleBox;
