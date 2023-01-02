import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./common/components/layout";
import Home from "./pages/home";
import ROUTES from "./common/routes.enum";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import ConversionContext from "./common/context/conversion";
import History from "./pages/history";

const theme = createTheme({
  palette: {
    primary: {
      main: "#009688",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ConversionContext>
          <Layout>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.HISTORY} element={<History />} />
            </Routes>
          </Layout>
        </ConversionContext>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
