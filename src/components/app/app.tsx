import styles from "./app.module.css";

import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/types/type';

import AppHeader from "../app-header/app-header";
import Main from "../../pages/main/main";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Orders from "../../pages/orders/orders";
import NotFound from "../../pages/not-found/not-found";
import Feed from "../../pages/feed/feed";
import FeedId from "../../pages/feed-id/feed-id";

import { getItems } from '../../services/actions/ingredients';
import { getUser } from "../../services/actions/user";

function App() {
  const { isAuth } = useAppSelector(state => state.user);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  React.useEffect(()=> {
    dispatch(getItems())
    if (!isAuth) {dispatch(getUser())}
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<ProtectedRouteElement element={<Register/>} anonymous={true}/>} />
        <Route path="/forgot-password" element={<ProtectedRouteElement element={<ForgotPassword />} anonymous={true}/>} />
        <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPassword />} anonymous={true}/>} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<Profile />}/>} />
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<Orders />}/>} />
        <Route path="/ingredients/:id" element={<IngredientDetails isPage={true}/>} />
        <Route path="/feed/:id" element={<FeedId isPage={true} />} />
        <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={<FeedId isPage={true} />}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={
            <Modal extraClasses="pb-15 pt-10" closeAction={() => {navigate('/')}} title="Детали ингредиента">
              <IngredientDetails isPage={false}/>
            </Modal>
          } />
          <Route path="/feed/:id" element={
            <Modal extraClasses="pb-15 pt-10" closeAction={() => {navigate('/feed')}} title="">
              <FeedId isPage={false} />
            </Modal>
          } />
          <Route path="/profile/orders/:id" element={
            <ProtectedRouteElement element={
              <Modal extraClasses="pb-15 pt-10" closeAction={() => {navigate('/profile/orders')}} title="">
                <FeedId isPage={false} />
              </Modal>
            }/>
          } />
        </Routes>
      )}
    </div>
  );
}

export default App;
