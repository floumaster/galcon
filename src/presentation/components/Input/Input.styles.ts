import styled from '@emotion/styled';
import { colors } from 'const/colors';

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  height: 60px;
  width: 200px;
  font-size: 24px;
  outline: none;
  background: linear-gradient(180deg, rgba(94,94,94,1) 0%, rgba(0,0,0,1) 100%);
  color: ${colors.PRIMARY_TEXT_COLOR};
  font-weight: 700;
  boder: 1px solid ${colors.WHITE};
  clip-path: polygon(15px 0,100% 0,100% calc(100% - 15px), calc(100% - 15px) 100%,0 100%,0 15px);
  padding-left: 10px;
  padding-right: 10px;
`;