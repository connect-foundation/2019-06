import styled from 'styled-components';

const Category = styled.div`
  &:hover {
    background: #e9ecef;
  }
  & + & {
    margin-top: 5px;
  }
`;

const CategoryLink = styled.a`
  color: black;
  text-decoration: none;
  font-size: 1rem;
`;

export { Category, CategoryLink };
