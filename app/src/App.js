import logo from "./logo.svg";
import "./App.css";
import TodoList from "./Components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./Contexts/TodosContext";
import { useState } from "react";

// uuid npx
import { v4 as uuidv4 } from "uuid";

// const theme = createTheme({
//   typography: {
//     fontFamily: ["Nunito"],
//   },
// });

// const initialTodos = [
//   {
//     id: uuidv4(), // كل ما استدعيها بعطيني يونيك id جديد
//     title: "reading a book",
//     details: "skdfjks",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "reading a book",
//     details: "skdfjks",
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     title: "reading a book",
//     details: "skdfjks",
//     isCompleted: false,
//   },
// ];
function App() {
  const [todos, setTodos] = useState([]);
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
      <TodosContext.Provider value={{ todos: todos, setTodos: setTodos }}>
        <TodoList />
      </TodosContext.Provider>
    </div>
    // </ThemeProvider>
  );
}

export default App;
