import React from 'react';
import styles from "./login.module.css";
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, Navigate, useLocation } from "react-router-dom";

import { auth, USER_DROPFAILED } from "../../services/actions/user";
import Preloader from "../../components/preloader/preloader";

import { useAppSelector, useAppDispatch, TOnChangeForm } from '../../services/types/type';

function Login() {
  const { userData, errorData, request, requestType, failed, isAuth } = useAppSelector(state => state.user);
  const [form, setValue] = React.useState<{ email: string; password: string; }>({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  if (isAuth) {
    const path = (location.state) ? location.state.from : "/";
    return (<Navigate to={path}/>)
  }

  function goToRegister() {
    navigate('/register');
  }
  function goToForgotPassword() {
    navigate('/forgot-password');
  }
  function goToRepeat() {
    dispatch({type: USER_DROPFAILED});
  };

  const onChange = (e: TOnChangeForm) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(auth(form))
  };

  return(
    <main className={`${styles.marginTop} ${styles.container}`}>
      <h1 className={`text text_type_main-medium ${styles.title}`}>Вход</h1>
      {((requestType === 'auth') && (request || failed)) ? (
        <>
          {request ? (
            <>
              <Preloader />
            </>
          ) : (
            <>
              <p className={`text text_type_main-large ${styles.mainText}`}>Ошибка</p>
              <div className={styles.container}>
                <p className={`text text_type_main-default ${styles.subtitle}`}>{errorData.message}</p>
                <p className={`text text_type_main-default text_color_inactive ${styles.subtitle}`}><a className={styles.link} onClick={goToRepeat}>Попробовать снова</a></p>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <form className={styles.form} onSubmit={submit}>
            <EmailInput
              onChange={onChange}
              value={form.email}
              name={'email'}
              isIcon={false}
              extraClass="mt-6"
            />
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name={'password'}
              extraClass="mt-6"
            />
            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">Войти</Button>
          </form>
        </>
      )}
      <div className={`mt-20 ${styles.textContainer}`}>
        <p className={`text text_type_main-default text_color_inactive ${styles.subtitle}`}>Вы — новый пользователь? <a className={styles.link} onClick={goToRegister}>Зарегистрироваться</a></p>
      </div>
      <div className={`mt-4 ${styles.textContainer}`}>
        <p className={`text text_type_main-default text_color_inactive ${styles.subtitle}`}>Забыли пароль? <a className={styles.link} onClick={goToForgotPassword}>Восстановить пароль</a></p>
      </div>
    </main>
  );
}

export default Login;