import React from 'react';

import formatSize from '../../utils/formatSize';

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
  boxSize?: "normal" | "big";
  onChange(value: number): void;
}

const ToggleBox: React.FC<ToggleBox> = ({ label, value, boxSize = 'normal', onChange }) => {
  const firstOptionValue = 10737418240;
  const secondOptionValue = 26843545600;

  return (
    <Container>
      {
        label && <Label>{label}</Label>
      }
      <BoxesContainer>
        <BoxContainer 
          boxSize={boxSize}
          isSelected={value === firstOptionValue}
          onPress={() => onChange(firstOptionValue)}
        >
          <BoxIcon 
            boxSize={boxSize}
            isSelected={value === firstOptionValue} 
            name="save"
          />
          <BoxText 
            boxSize={boxSize}
            isSelected={value === firstOptionValue}
          >
            {formatSize(firstOptionValue)}
          </BoxText>
        </BoxContainer>
        <BoxContainer 
          boxSize={boxSize}
          isSelected={value === secondOptionValue}
          onPress={() => onChange(secondOptionValue)}
        >
          <BoxIcon 
            boxSize={boxSize}
            isSelected={value === secondOptionValue} 
            name="server"
          />
          <BoxText 
            boxSize={boxSize}
            isSelected={value === secondOptionValue}
          >
            {formatSize(secondOptionValue)}
          </BoxText>
        </BoxContainer>     
      </BoxesContainer>
    </Container>
  );
}

export default ToggleBox;
