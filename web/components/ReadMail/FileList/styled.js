import styled from 'styled-components';

const FlexColumnHeader = styled.div`
  flex: 0 0 20px;
  display: flex;
  align-items: center;
`;

const FlexColumnItem = styled.div`
  flex: 0 0 20px;
  max-width: 700px;
  padding: 1px 2px;
  margin-top: 2px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
`;

const ImageColumn = styled.div`
  width: 150px;
  height: 180px;
`;

const ImageName = styled.div`
  width: 150px;
  height: 30px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
    font-weight: bold;
  }
`;

const ImageWrapper = styled.div`
  cursor: pointer;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 150px;
  max-height: 150px;
  margin: auto;
`;

export { FlexColumnHeader, FlexColumnItem, ImageGrid, ImageColumn, ImageName, ImageWrapper, Image };
