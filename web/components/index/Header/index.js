import React from 'react';

const Header = ({ brand }) => (
  <div>
    <div>{brand}</div>
    <div>
      <input type="text" />
      <button>검색</button>
    </div>
  </div>
);

export default Header;
