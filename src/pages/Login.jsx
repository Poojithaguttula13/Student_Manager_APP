import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { control, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    try {
      const res = await axios.get("http://localhost:3000/credentials");
      const user = res.data.find(
        (user) => user.email === data.email && user.password === data.password
      );
      if (user) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful!");
        reset();
        navigate("/studentPage");
      } else {
        toast.error("Invalid email or password");
        return;
      }
    } catch (err) {
      toast.error("Something went wrong", err);
    }
  };

  return (
    <Box
      // fullWidth
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            px: { xs: 2, sm: 4 },
            py: { xs: 4, sm: 6 },
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h5">Login</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",

              }}
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
 
              }}
              render={({ field, fieldState }) => (
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
}