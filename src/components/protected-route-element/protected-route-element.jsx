import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { getUser } from "../../services/actions/user";
import FullScreenContainer from "../full-screen-container/full-screen-container";
import Preloader from "../preloader/preloader";


function ProtectedRouteElement({ element, anonymous = false }) {
  const refreshToken = getCookie('refreshToken');

  const { userData, errorData, requestType, request, failed, isAuth } = useSelector(state => state.user);
  const [isUserLoaded, setUserLoaded] = React.useState(isAuth ? true : (refreshToken ? false : true));
  const dispatch = useDispatch();
  const location = useLocation()
  const from = location.state?.from || '/';

  React.useEffect(() => {
    if (!isAuth) {
      dispatch(getUser());
    }
  }, []);

  React.useEffect(() => {
    if ((requestType === 'user') && !isUserLoaded) {
      if ((Object.keys(userData).length > 0) || (Object.keys(errorData).length > 0)) {
        setUserLoaded(true);
      }
    }
  }, [userData,errorData,requestType,isUserLoaded]);

  if (!isUserLoaded) {
    return (<FullScreenContainer><Preloader /></FullScreenContainer>);
  }

  // Если разрешен неавторизованный доступ, а пользователь авторизован, то отправляем его на предыдущую страницу
  if (anonymous && isAuth) {return <Navigate to={ from } />}

  // Если требуется авторизация, а пользователь не авторизован, то отправляем его на страницу логин
  if (!anonymous && !isAuth) {return <Navigate to="/login" state={{ from: location}}/>}

  // Если все ок, то рендерим внутреннее содержимое
  return element;
}

export default ProtectedRouteElement;