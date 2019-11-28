import Router from 'next/router';

const handleErrorStatus = ({ status, message }) => {
  // TODO: 에러페이지 만들기
  switch (status) {
    case 401:
      Router.push('/login');
      break;
    default:
      break;
  }
};

export { handleErrorStatus };
