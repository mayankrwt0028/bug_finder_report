import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "../validation/auth.schema";
import type { SignupFormData } from "../validation/auth.schema";

import AuthLayout from "../layouts/AuthLayout";

import { registerUser } from "../services/auth.service";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      role: "QA",
    },
  });
  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);

      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      toast.success("Account created successfully");

      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your Bug Reporting Portal account"
    >
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          margin="normal"
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>

              <Select {...field} label="Role">
                <MenuItem value="QA">QA Engineer</MenuItem>

                <MenuItem value="DEVELOPER">Developer</MenuItem>
              </Select>
            </FormControl>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          loading={loading}
          sx={{ mt: 3 }}
        >
          Create Account
        </Button>

        <Box
          sx={{
            textAlign: "center",
            mt: 3,
          }}
        >
          Already have an account?{" "}
          <Link component="button" onClick={() => navigate("/login")}>
            Login
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default SignUp;
