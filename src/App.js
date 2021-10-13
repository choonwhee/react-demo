import React, { useState } from "react";
import "./App.css";
import ALayout from "./components/aLayout";
import TestContentPanel2 from "./components/testContentPanel2";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(53, 188, 238)",
      dark: "rgb(47, 167, 212)",
      light: "rgb(102, 214, 255)",
    },
    secondary: {
      main: "rgb(46, 48, 73)",
      light: "rgb(46, 48, 73)",
      contrastText: "rgb(255,255,255)",
    },
  },
  typography: {
    fontSize: 12,
    body1: {
      color: "rgba(77,88,106)",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ALayout contentPanel={<TestContentPanel2 />} />
      </div>
    </ThemeProvider>
  );
}

export default App;
