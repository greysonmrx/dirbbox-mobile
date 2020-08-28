import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps, StyleProp, ViewStyle } from 'react-native';
import { useField } from '@unform/core';

import { 
  Container,
  InputContainer,
  TextInput,
  Label,
  Icon,
  ErrorText,
  ErrorButton,
  ErrorIcon,
} from './styles';

interface InputProps extends TextInputProps {
  name: string;
  label?: string;
  icon?: string;
  style?: StyleProp<ViewStyle>;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, label, icon, style, ...rest }, 
  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setHasValue(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={style}>
      {
        label && <Label>{label}</Label>
      }
      <InputContainer isFocused={isFocused} isErrored={!!error}>
        {
          icon && <Icon isFocused={isFocused} hasValue={hasValue} name={icon} size={20} />
        }        
        <TextInput
          ref={inputElementRef}
          keyboardAppearance="light"
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />      
        {
          !!error && (
            <ErrorButton 
              onPress={() => setShowError(!showError)}
              hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <ErrorIcon />
            </ErrorButton>
          )
        }
      </InputContainer>
      {
        showError && <ErrorText>{error}</ErrorText>
      }
    </Container>
  );
}

export default forwardRef(Input);
