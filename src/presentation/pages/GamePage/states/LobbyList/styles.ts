import styled from 'styled-components';

export const LobbyLayout = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  width: 100%;
  padding: 20px;
`;

export const List = styled.div`
  flex: 60%;
`;
export const Preview = styled.div`
  flex: 40%;
`;

export const BoxContent = styled.div`
  height: 100%;
  padding: 20px;
  border: 2px solid white;
  border-radius: 20px;
  background-color: rgba(0, 121, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`;

export const ScrollContainer = styled.div`
  overflow-y: scroll;
`;
