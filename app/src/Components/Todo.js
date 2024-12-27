import { Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";

// Icons
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function Todo({ title, details }) {
  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant="h5" sx={{ textAlign: "left" }}>
                {title}
              </Typography>

              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {details}
              </Typography>
            </Grid>

            {/* Action buttons */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "green",
                  background: "white",
                  border: "solid green 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "blue",
                  background: "white",
                  border: "solid blue 3px",
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "red",
                  background: "white",
                  border: "solid red 3px",
                }}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Grid>
            {/* === Action buttons === */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
