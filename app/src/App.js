import logo from "./logo.svg";
import "./App.css";
import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Nunito"],
  },
});

function App() {
  return (
    // <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "black",
          height: "100vh",
          direction: "ltr",
        }}
      >
        <TodoList />
      </div>
    // </ThemeProvider>
  );
}

export default App;
