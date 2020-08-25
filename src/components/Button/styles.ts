import styled, { css } from 'styled-components/native';

type ContainerProps = {
  type: 'default' | 'secondary' | 'text';
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: transparent;

  ${({ type }) =>
    type === 'default'
      ? css`
          background-color: #567DF4;
        `
      : null};

  ${({ type }) =>
    type === 'secondary'
      ? css`
          background-color: rgba(86, 125, 244, .1);
        `
      : null};
`;
