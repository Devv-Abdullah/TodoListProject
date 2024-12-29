import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";

/* icons */
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

// Components
import Todo from "./Todo";

// others
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../Contexts/TodosContext";

// uuid npx
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");

  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // filteration arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRendered = todos;

  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosMap = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        // title={t.title}
        // details={t.details}
        // isCompleted={t.isCompleted}
        // OR
        todo={t}
      />
    );
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storageTodos);
  }, []);

  function changedDisplayType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];

    // setTodos([...todos, newTodo]);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput(""); // عشان بعد ما احط اد في الانبت ينحذفوا وما يضلوا
  }
  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflow: "scroll" }} //يعتمد على حجم نافذة العرض، مما يجعله مناسبًا للتصميمات المتجاوبة
      >
        <CardContent>
          <Typography variant="h2">My tasks</Typography>
          <Divider />

          {/* toggle button */}
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "30px" }}
            value={displayedTodosType}
            exclusive
            onChange={changedDisplayType}
            aria-label="text alignment"
          >
            <ToggleButton className="hover-button" value="all">
              All
            </ToggleButton>
            <ToggleButton className="hover-button" value="completed">
              Finished
            </ToggleButton>
            <ToggleButton className="hover-button" value="non-completed">
              Unfinished
            </ToggleButton>
          </ToggleButtonGroup>
          {/* =========== toggle button ========== */}

          {/* All Todos */}
          {todosMap}
          {/* === All Todos === */}

          {/* input + add button */}
          <Grid container marginTop="20px" spacing={2}>
            <Grid
              size={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Task title"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>

            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.length == 0}
              >
                Addition
              </Button>
            </Grid>
          </Grid>
          {/* === input + add button === */}
          
        </CardContent>
      </Card>
    </Container>
  );
}
