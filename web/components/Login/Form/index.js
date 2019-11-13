import React, { useState } from 'react';
import { useRouter } from 'next/router';
import validator from './validator';

import S from './styled';

const Form = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [msg, setMsg] = useState('');

  const router = useRouter();

  const onSubmitHandler = e => {
    e.preventDefault();
    if (validateForm(userId, userPassword)) router.push('/');
  };

  const validateForm = (id, password) => {
    if (id.length === 0) {
      setMsg('아이디가 입력되지 않았습니다');
      return false;
    }

    if (password.length === 0) {
      setMsg('비밀번호가 입력되지 않았습니다');
      return false;
    }

    if (!validator.validate('id', id)) {
      setMsg('잘못된 아이디입니다');
      return false;
    }

    if (!validator.validate('password', password)) {
      setMsg('잘못된 비밀번호입니다.');
      return false;
    }

    setMsg('');
    return true;
  };

  return (
    <S.Form>
      <S.Input
        type="text"
        className="form-control"
        id="userId"
        placeholder="아이디"
        value={userId}
        name="userId"
        onChange={({ target: { value } }) => setUserId(value)}
      />
      <S.Input
        type="password"
        className="form-control"
        id="password"
        placeholder="비밀번호"
        value={userPassword}
        name="password"
        onChange={({ target: { value } }) => setUserPassword(value)}
      />
      <S.ErrorText>{msg}</S.ErrorText>
      <S.Button className="submit-btn max-width" onClick={onSubmitHandler}>
        로그인
      </S.Button>
    </S.Form>
  );
};
export default Form;
