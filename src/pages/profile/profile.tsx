import React from 'react';
import styles from "./profile.module.css";
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { updateUserData, USER_DROPFAILED } from '../../services/actions/user';
import Preloader from "../../components/preloader/preloader";
import ProfileNav from '../../components/profile-nav/profile-nav';

import { useAppSelector, useAppDispatch, TOnChangeForm } from '../../services/types/type';

function Profile() {
  const { userData, errorData, request, requestType, failed, isAuth } = useAppSelector(state => state.user);
  const [form, setValue] = React.useState<{ name: string; email: string; password: string; }>
  ({ name: ((userData) ? userData.name : ''), email: ((userData) ? userData.email : ''), password: '' });
  const dispatch = useAppDispatch();

  const onChange = (e: TOnChangeForm) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserData(form))
  };
  const resetData = () => {
    setValue({ name: ((userData) ? userData.name : ''), email: ((userData) ? userData.email : ''), password: '' });
  };
  function goToRepeat() {
    dispatch({type: USER_DROPFAILED});
  };

  return(
    <main className={styles.container}>
      <ProfileNav />

      {((requestType === 'user') && (request || failed)) ? (
        <>
          {request ? (
            <>
              <Preloader />
            </>
          ) : (
            <>
              <p className={`text text_type_main-large ${styles.mainText}`}>Ошибка</p>
              <div className={styles.containerText}>
                <p className={`text text_type_main-default ${styles.subtitle}`}>{errorData.message}</p>
                <p className={`text text_type_main-default text_color_inactive ${styles.subtitle}`}><a className={styles.link} onClick={goToRepeat}>Попробовать снова</a></p>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <form onSubmit={submit}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              value={form.name}
              icon={'EditIcon'}
              name={'name'}
              error={false}
              onIconClick={() => {}}
              errorText={'Ошибка'}
              size={'default'}
            />
            <EmailInput
              onChange={onChange}
              value={form.email}
              name={'email'}
              placeholder="Логин"
              isIcon={true}
              extraClass="mt-6"
            />
            <PasswordInput
              onChange={onChange}
              value={form.password}
              name={'password'}
              icon="EditIcon"
              extraClass="mt-6"
            />
            {(userData && ((userData.name !== form.name) || (userData.email !== form.email) || ('' !== form.password))) &&
              <div className={styles.buttonContainer}>
                <Button htmlType="button" type="secondary" size="medium" extraClass="" onClick={resetData}>Отменить</Button>
                <Button htmlType="submit" type="primary" size="medium" extraClass="">Сохранить</Button>
              </div>
            }
          </form>
        </>
      )}
    </main>
  );
}

export default Profile;