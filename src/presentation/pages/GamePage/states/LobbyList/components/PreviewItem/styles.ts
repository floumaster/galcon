import styled from 'styled-components';

export const ItemBox = styled.div`
  color: white;
  font-size: 24px;
  height: 60px;
`;

export const PlayersBox = styled.div`
  border: 2px solid white;
  height: auto;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 16px;
`;

export const ColoredSquare = styled.div<{ $color: string }>`
  height: 30px;
  width: 30px;
  background-color: ${props => props.$color};
`;

export const PlayerCell = styled.div`
  display: flex;
  align: center;
  justify-content: space-between;
`;