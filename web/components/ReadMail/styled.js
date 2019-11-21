/* eslint-disable no-undef */
import styled from 'styled-components';
import { SUBJECT } from './constant';

const ReadArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
`;

const TitleView = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ role }) => (role === SUBJECT ? 'space-between' : 'flex-start')};
  span {
    margin: ${({ role }) => (role === SUBJECT ? 'none' : '8px 8px 8px 0')};
    font-weight: ${({ role }) => (role === SUBJECT ? 'normal' : '700')};
  }
`;

const ReadFrame = styled.div``;

export { ReadArea, TitleView, Column, ReadFrame };
