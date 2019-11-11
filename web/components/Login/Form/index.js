import React, { useState } from 'react';
import { useRouter, Router } from 'next/router';

import Header from '../Header';
import S from './styled';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const onSubmitHandler = e => {
    e.preventDefault();
    console.log('???');
    router.push('/');
  };

  return (
    <S.Form>
      <Header />
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="아이디"
            value={email}
            name="email"
            onChange={({ target: { value } }) => setEmail(value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>
        <button className="submit-btn max-width" onClick={onSubmitHandler}>
          Login
        </button>
      </form>
    </S.Form>
  );
};
export default Form;
