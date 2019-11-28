import Router from 'next/router';

const handleErrorStatus = ({ status, message }) => {
  switch (status) {
    case 401:
      Router.push('/login');
      break;
    default:
      break;
  }
};

export { handleErrorStatus };
