import React from 'react';
import styles from "./register.module.css";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from "react-router-dom";

import { register, USER_DROPFAILED } from "../../services/actions/user";
import Preloader from "../../components/preloader/preloader";

import { useAppSelector, useAppDispatch, TOnChangeForm } from '../../services/types/type';

function Register() {
  const { userData, errorData, request, requestType, failed, isAuth } = useAppSelector(state => state.user);
  const [form, setValue] = React.useState<{ name: string; email: string; password: string }>({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function goToLogin() {
    navigate('/login');
  };
  function goToRepeat() {
    dispatch({type: USER_DROPFAILED});
  };
  const onChange = (e: TOnChangeForm) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(form))
  };

  return(
    <main className={`${styles.marginTop} ${styles.container}`}>
      <h1 className={`text text_type_main-medium ${styles.title}`}>Регистрация</h1>

      {((requestType === 'register') && (request || failed)) ? (
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
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              value={form.name}
              icon={undefined}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="mt-6"
            />
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
            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">Зарегистрироваться</Button>
          </form>
        </>
      )}
      <div className={`mt-20 ${styles.textContainer}`}>
        <p className={`text text_type_main-default text_color_inactive ${styles.subtitle}`}>Уже зарегистрированы? <a className={styles.link} onClick={goToLogin}>Войти</a></p>
      </div>
    </main>
  );
}

export default Register;