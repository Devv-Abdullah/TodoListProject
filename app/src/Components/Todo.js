import { Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import { useContext, useState } from "react";
import { TodosContext } from "../Contexts/TodosContext";

// Icons
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Todo({ todo, handleCheck }) {
  const { todos, setTodos } = useContext(TodosContext);

  const [showDelete, setShowDelete] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);

  const [editedTodo, setEditedTodo] = useState({
    title: todo.title, // عشان بس اعدل يضل نفس التعديل مكتوب
    details: todo.details,
  });

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted; // true => false , false => true
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    setShowDelete(true);
  }

  function handleDeleteDialogClose() {
    setShowDelete(false);
  }

  function handleUpdateClick() {
    setShowUpdate(true);
  }

  function handleUpdateClose() {
    setShowUpdate(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      // filter بترجع true or false
      // if (t.id == todo.id) {
      //   return false;
      // } else {
      //   return true;
      // }
      return t.id != todo.id; // 1 != 2
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: editedTodo.title,
          details: editedTodo.details,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setShowUpdate(false); // عشان بعد ما احط Done يطلع
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  return (
    <>

      {/* Delete dialog */}
      <Dialog
        style={{ direction: "ltr" }}
        onClose={handleDeleteDialogClose} // عشان لما اضغط على اي مساحه فاضيه
        open={showDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete the task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo the deletion once it is complete.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>closing</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            Yes, delete.
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===Delete dialog=== */}

      {/* Update dialog */}
      <Dialog
        style={{ direction: "ltr" }}
        onClose={handleUpdateClose} // عشان لما اضغط على اي مساحه فاضيه
        open={showUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Task title"
            fullWidth
            variant="standard"
            value={editedTodo.title}
            onChange={(e) => {
              setEditedTodo({ ...editedTodo, title: e.target.value });
            }}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="The details"
            fullWidth
            variant="standard"
            value={editedTodo.details}
            onChange={(e) => {
              setEditedTodo({ ...editedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>closing</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===Update dialog=== */}

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          // background: "#283593",
          background: "#263238",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                sx={{
                  textAlign: "left",
                  fontSize: "25px",
                  color: "white",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>

              <Typography
                // color: "#0091ea"
                sx={{ textAlign: "left", fontSize: "12px", color: "white" }}
              >
                {todo.details}
              </Typography>
            </Grid>

            {/* Action buttons */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >

              {/* Check icon button */}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "green",
                  background: todo.isCompleted ? "green" : "white",
                  border: "solid green 3px",
                  position: "relative",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* ===Check icon button=== */}

              {/* Update button */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "blue",
                  background: "white",
                  border: "solid blue 3px",
                  position: "relative",
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              {/* ===Update button=== */}

              {/* Delete button */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "red",
                  background: "white",
                  border: "solid red 3px",
                  position: "relative",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlinedIcon />
              </IconButton>
              {/* ===Delete button=== */}

            </Grid>
            {/* === Action buttons === */}
            
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
