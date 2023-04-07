import React, { useCallback, useEffect, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import TodoCreate from "./components/TodoCreate";
import TodoHead from "./components/ToDoHead";
import TodoList from "./components/ToDoList";
import TodoTemplate from "./components/ToDoTemplate";
import { darkTheme, lightTheme } from "./theme/theme";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  };
  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <TodoTemplate>
          <TodoHead isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <TodoList />
          <TodoCreate />
        </TodoTemplate>
      </ThemeProvider>
    </>
  );
}

export default App;
