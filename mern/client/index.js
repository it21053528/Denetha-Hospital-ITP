import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, useNavigate } from "react-router-dom";
import {CookiesProvider, useCookies} from 'react-cookie';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import createRoutes from './routes/routes';
import { Header } from './components/Header';

const routes = createRoutes();

const theme = new createTheme({
  palette: {
    primary: {
      main: '#00ADA3'
    },
    secondary: {
      main: '#2A628F'
    }
  }
});

const Main = () => {
  const [cookies, setCookie] = useCookies(['loggedIn']);

  useEffect(()=>{
    setCookie('proxy', 'http://localhost:5000', {path: '/', maxAge: (3600*12)});
  }, []);

  const navigateTo = useNavigate();
  useEffect(()=>{
    //check cookies, if not logged in, route to /login
    if(cookies.loggedIn !== 'true') {
      navigateTo('/');
    }
  }, [cookies, navigateTo]);

  return (
    <>
      {(cookies.loggedIn==='true') ? <Header /> : null}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Main />
          {routes}
        </ThemeProvider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);
