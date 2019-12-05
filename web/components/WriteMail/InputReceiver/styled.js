import styled from 'styled-components';

export const ReceiverListWrapper = styled.div`
  min-height: 29px;
  padding: 5px 5px;
  border: 1px solid black;
  border-radius: 5px;
  overflow: auto;
  cursor: text;
`;

export const ReceiverListUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const ReceiverListLi = styled.li`
  margin-right: 3px;
  float: left;
  padding: 5px 5px 2px 5px;
  border: ${props => (props.validation ? '1px solid #0066FF' : '1px solid #D93024')};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  word-break: break-all;
  width: auto;
  min-height: 20px;
  font-size: 14px;
  background-color: ${props => (props.validation ? '#0066FF' : '#D93024')};
  color: ${props => (props.validation ? 'white' : '#FDEFEF')};
`;

export const ReceiverLiDeleteBtn = styled.div`
  margin-left: 5px;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  outline: none;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ReceiverListInput = styled.input`
  width: 20px;
  margin-top: 3px;
  float: left;
  min-height: 16px;
  border: none;
  padding: 5px 5px 2px 5px;
  font-size: 14px;
  max-width: 485px;
  padding-right: 10px;
`;

export const ReceiverInputWidthGuide = styled.div`
  display: inline-block;
  width: auto;
  height: auto;
  font-size: 14px;
  white-space: nowrap;
  position: absolute;
  left: -1000px;
  top: -1000px;
`;
