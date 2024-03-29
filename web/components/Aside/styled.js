import styled from 'styled-components';

const Aside = styled.aside`
  width: 250px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ced4da;
  overflow-y: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const EllipsisList = styled.div`
  width: 85px;
  height: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const WriteArea = styled.div`
  flex: 0 0 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrtieButton = styled.button`
  border-radius: 2rem;
  font-size: 1rem;
  padding: 10px 1rem;
  border: 2px solid #ced4da;
  outline: none;
  cursor: pointer;
  background: white;
  &:hover {
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.15);
  }
  & + & {
    margin-left: 10px;
  }
`;

const DefaultReadArea = styled.div`
  flex: 0 0;
  display: flex;
  flex-direction: column;
  & + & {
    border-top: 3px solid #ced4da;
    margin-top: 1rem;
  }
`;

const OptionReadArea = styled.div`
  flex: 1 1;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  & + & {
    border-top: 3px solid #ced4da;
    margin-top: 1rem;
  }
`;

export default { WriteArea, EllipsisList, DefaultReadArea, OptionReadArea, WrtieButton, Aside };
