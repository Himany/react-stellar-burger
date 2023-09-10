import styles from "./app.module.css";

import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AppHeader from "../app-header/app-header";
import Main from "../../pages/main/main";
import Register from "../../pages/register/register";
import Login from "../../pages/login/login";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal.jsx";
import Orders from "../../pages/orders/orders";
import NotFound from "../../pages/not-found/not-found";
import Feed from "../../pages/feed/feed";

import { getItems } from '../../services/actions/ingredients';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  React.useEffect(()=> {
    dispatch(getItems())
  }, [dispatch])

  return (
    <div className={styles.app}>
      <Routes location={background || location}>
        <Route path="/" element={
          <>
              <AppHeader />
              <Main/>
          </>
        } />
        <Route path="/login" element={
          <>
              <AppHeader />
              <Login/>
          </>
        } />
        <Route path="/register" element={
          <>
              <AppHeader />
              <Register/>
          </>
        } />
        <Route path="/forgot-password" element={
          <>
              <AppHeader />
              <ForgotPassword />
          </>
        } />
        <Route path="/reset-password" element={
          <>
              <AppHeader />
              <ResetPassword />
          </>
        } />
        <Route path="/feed" element={
          <>
            <AppHeader />
            <Feed />
          </>
        } />
        <Route path="/profile" element={
          <ProtectedRouteElement element={
            <>
              <AppHeader />
              <Profile />
            </>
          }/>
        } />
        <Route path="/profile/orders" element={
          <ProtectedRouteElement element={
            <>
              <AppHeader />
              <Orders />
            </>
          }/>
        } />
        <Route path="ingredients/:id" element={
          <>
            <AppHeader />
            <IngredientDetails isPage={true}/>
          </>
        } />
        <Route path="*" element={
          <>
            <AppHeader />
            <NotFound />
          </>
        } />
      </Routes>
      {background && (
        <Routes>
          <Route path="ingredients/:id" element={
            <Modal extraClasses="pb-15 pt-10" closeAction={() => {navigate('/')}} title="Детали ингредиента">
              <IngredientDetails isPage={false}/>
            </Modal>
          } />
        </Routes>
      )}
    </div>
  );
}

export default App;
