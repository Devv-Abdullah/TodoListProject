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

// uuid npx
import { v4 as uuidv4 } from "uuid";

// others
import { useState } from "react";

const initialTodos = [
  {
    id: uuidv4(), // كل ما استدعيها بعطيني يونيك id جديد
    title: "reading a book",
    details: "skdfjks",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "reading a book",
    details: "skdfjks",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "reading a book",
    details: "skdfjks",
    isCompleted: false,
  },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [titleInput, setTitleInput] = useState("");
  const todosMap = todos.map((t) => {
    return <Todo key={t.id} title={t.title} details={t.details} />;
  });

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);
    setTitleInput(""); // عشان بعد ما احط اد في الانبت ينحذفوا وما يضلوا
  }
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h2">My tasks</Typography>
          <Divider />
          {/* toggle button */}
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "30px" }}
            // value={alignment}
            exclusive
            // onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left">All</ToggleButton>
            <ToggleButton value="center">Finished</ToggleButton>
            <ToggleButton value="right">Unfinished</ToggleButton>
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
