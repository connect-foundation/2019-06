import React from 'react';
import * as S from './styled';

const CategoryCard = ({ category }) => (
  <S.Category>
    <S.CategoryLink href="/">{category}</S.CategoryLink>
  </S.Category>
);

export default CategoryCard;
