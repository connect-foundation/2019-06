import React from 'react';
import * as S from './styled';

const CategoryCard = ({ category, onClick }) => (
  <S.Category onClick={onClick}>{category}</S.Category>
);

export default CategoryCard;
