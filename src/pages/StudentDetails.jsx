import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CardMedia,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";

export default function StudentDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h6">
          No student data found. Please go back to the student list.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/studentPage")}>
          Back
        </Button>
      </Box>
    );
  }

  const { name, age, grade, image, description } = state;

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 3, sm: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Button
        variant="text"
        color="background.default"
        onClick={() => navigate("/studentPage")}
        sx={{ alignSelf: "flex-start", mb: 2 }}
      >
        <ArrowBackIcon />
        <Typography variant="body1">Back</Typography>
      </Button>

      <Card
        sx={{
          width: {
            xs: "100%",
            sm: "400px",
            md: "450px",
          },
          boxShadow: 4,
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "background.paper",
          color: "primary",
          textAlign: "center",
        }}
      >
        {image ? (
          <CardMedia
            component="img"
            height="100px"
            image={image}
            alt={name}
            sx={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50%",
              mx: "auto",
              mt: 3,
            }}
          />
        ) : (
          <CardMedia
            component="img"
            height="100px"
            image="https://picsum.photos/200"
            alt={name}
            sx={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "50%",
              mx: "auto",
              mt: 2,
            }}
          />
        )}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1">Age: {age}</Typography>
          <Typography variant="body1">Grade: {grade}</Typography>
          {description ?? (
            <Typography variant="body2" mt={2}>
              {description ?? "Aspires to grow in a creative tech environment"}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}