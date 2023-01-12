import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import {GoogleOAuthProvider} from "@react-oauth/google";
import App from '../components/App';
import Login from '../components/Login';
import Header from '../components/Header';

const AppRouter = () => {
  if (!localStorage.getItem('token')) {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <GoogleOAuthProvider clientId='981927846493-3icf6itrmftk1q5buk3mvvdsf7stf934.apps.googleusercontent.com'>
            <div className="main-content">
              <Route component={Login} path="/" />
            </div>
          </GoogleOAuthProvider>
        </div>
      </BrowserRouter>
    );
  }


  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <div className="main-content">
          <Route component={App} path="/" />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
