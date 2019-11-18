import styled from 'styled-components';

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
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

export default { WriteArea, DefaultReadArea, OptionReadArea, WrtieButton, Aside };
