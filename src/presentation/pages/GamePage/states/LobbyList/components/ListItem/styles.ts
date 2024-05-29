import styled from 'styled-components';

export const ItemBox = styled.div`
  border: 2px solid white;
  height: auto;
  border-radius: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  font-size: 28px;
  margin-bottom: 16px;

  &:hover {
    opacity: 0.5;
  }
  &:active {
    opacity: 0.2;
  }

  background-color: rgba(0, 121, 255, 0.2);
`;
