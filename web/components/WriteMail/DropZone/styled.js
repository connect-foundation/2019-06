import styled from 'styled-components';

const FileUploadInfo = styled.div`
  text-align: right;
`;

const UploadArea = styled.div`
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-style: dashed;
`;

const FlexRowWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  justify-content: space-between;
`;

const FlexItem = styled.div`
  height: 100%;
`;

export { UploadArea, FileUploadInfo, FlexRowWrap, FlexItem };
