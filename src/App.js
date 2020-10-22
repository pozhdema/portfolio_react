import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import styled from "styled-components";
import './style.css'
import theme from "styled-theming";
import {Provider as ReduxProvider} from "react-redux";
import store from './store/store';
import DarkThemeProvider from "./components/darkThemeProvider/darkThemeProvider";
import Layout from "./components/layout/layout";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalCookie from "./components/modalCookie/modalCookie";

export const backgroundColor = theme("theme", {
    light: "#fff",
    dark: "#2d2d2d",
});

export const textColor = theme("theme", {
    light: "#000",
    dark: "#fff",
});

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  font-family: Caveat;
  font-size: 20px;
  background-color: ${backgroundColor};
  color: ${textColor};
`;

const App = () => {
    return (
        <ReduxProvider store={store}>
            <DarkThemeProvider>
                <Container>
                    <ModalCookie/>
                    <Router>
                        <Layout/>
                    </Router>
                </Container>
                <ToastContainer/>
            </DarkThemeProvider>
        </ReduxProvider>
    )
};

export default App;
