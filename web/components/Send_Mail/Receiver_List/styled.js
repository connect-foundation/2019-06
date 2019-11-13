import styled from 'styled-components';

const ReceiverListWrapper = styled.div`
  width: 500px;
  height: 29px;
  padding: 5px 5px;
  border: 1px solid black;
  border-radius: 5px;
  overflow: auto;
  cursor: text;
`;

const ReceiverListUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const ReceiverListLi = styled.li`
  margin-right: 3px;
  float: left;
  padding: 5px 5px 2px 5px;
  border: 1px solid grey;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  word-break: break-all;
  width: auto;
  min-height: 20px;
  font-size: 14px;
`;

const ReceiverLiDeleteBtn = styled.div`
  margin-left: 5px;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  outline: none;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
`;

const ReceiverListInput = styled.input`
  width: auto;
  margin-top: 3px;
  float: left;
  min-height: 16px;
  border: none;
  padding: 5px 5px 2px 5px;
  font-size: 14px;
  min-width: 30px;
  max-width: 485px;
  padding-right: 10px;
`;

export default {
  ReceiverListWrapper,
  ReceiverListUl,
  ReceiverListLi,
  ReceiverLiDeleteBtn,
  ReceiverListInput,
};
