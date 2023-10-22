import React from 'react';
import styles from "./reset-password.module.css";
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, Navigate } from "react-router-dom";

import Preloader from "../../components/preloader/preloader";
import { resetPassword, RESET_RESET_PAS_DATA } from '../../services/actions/resetPassword';

import { useAppSelector, useAppDispatch, TOnChangeForm } from '../../services/types/type';

function ResetPassword() {
  const { forgotPasData, resetPasData, errorData, forgotPasRequest, forgotPasFailed, resetPasRequest, resetPasFailed } = useAppSelector(state => state.resetPassword);
  const [form, setValue] = React.useState<{ password: string; token: string; }>({ password: '', token: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function goToLogin() {
    navigate('/login');
  }
  function goToRepeat() {
    dispatch({type: RESET_RESET_PAS_DATA});
  };
  const onChange = (e: TOnChangeForm) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(form));
  };

  if (Object.keys(forgotPasData).length <= 0) {return (<Navigate to="/" replace={true}/>)}
  if (Object.keys(resetPasData).length > 0) {return (<Navigate to="/" replace={false}/>)}

  return(
    <main className={`${styles.marginTop} ${styles.container}`}>
      <h1 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h1>
      {(resetPasRequest || resetPasFailed) ? (
        <>
          {resetPasRequest ? (
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
          <form onSubmit={submit} className={styles.container}>
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name={'password'}
              extraClass="mt-6"
            />
            <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={onChange}
              value={form.token}
              icon={undefined}
              name={'token'}
              error={false}
              onIconClick={() => {}}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="mt-6"
            />
            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">Сохранить</Button>
          </form>
        </>
      )}
      <div className={`mt-20 ${styles.textContainer}`}>
        <p className={`text text_type_main-default text_color_inactive ${styles.subtitle}`}>Вспомнили пароль? <a className={styles.link} onClick={goToLogin}>Войти</a></p>
      </div>
    </main>
  );
}

export default ResetPassword;