import React from 'react';
import styles from "./forgot-password.module.css";
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Preloader from "../../components/preloader/preloader";
import { forgotPassword, RESET_FORGOT_PAS_DATA } from '../../services/actions/resetPassword';

function ForgotPassword() {
  const { forgotPasData, resetPasData, errorData, forgotPasRequest, forgotPasFailed, resetPasRequest, resetPasFailed } = useSelector(state => state.resetPassword);
  const [form, setValue] = React.useState({ email: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function goToLogin() {
    navigate('/login');
  }
  function goToRepeat() {
    dispatch({type: RESET_FORGOT_PAS_DATA});
  };

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const submit = e => {
    e.preventDefault();
    dispatch(forgotPassword(form));
  };

  if (Object.keys(forgotPasData).length > 0) {navigate('/reset-password', {replace: false})}

  return(
    <main className={`${styles.marginTop} ${styles.container}`}>
      <h1 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h1>
      {(forgotPasRequest || forgotPasFailed) ? (
        <>
          {forgotPasRequest ? (
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
            <EmailInput
              onChange={onChange}
              value={form.email}
              name={'email'}
              placeholder="E-Mail"
              isIcon={false}
              extraClass="mt-6"
            />
            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">Восстановить</Button>
          </form>
        </>
      )}
      <div className={`mt-20 ${styles.textContainer}`}>
        <p className={`text text_type_main-default text_color_inactive ${styles.subtitle}`}>Вспомнили пароль? <a className={styles.link} onClick={goToLogin}>Войти</a></p>
      </div>
    </main>
  );
}

export default ForgotPassword;