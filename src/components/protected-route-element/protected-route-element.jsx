import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../utils/cookie';
import { getUser } from "../../services/actions/user";
import FullScreenContainer from "../full-screen-container/full-screen-container";
import Preloader from "../preloader/preloader";


function ProtectedRouteElement({ element }) {
  const accessToken = getCookie('accessToken');

  const { userData, errorData, requestType, request, failed, isAuth } = useSelector(state => state.user);
  const [isUserLoaded, setUserLoaded] = React.useState(isAuth ? true : (accessToken ? false : true));
  const dispatch = useDispatch();
  const location = useLocation()

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

  return isAuth ? element : <Navigate to="/login" state={{ from: location.pathname }}/>;
}

export default ProtectedRouteElement;