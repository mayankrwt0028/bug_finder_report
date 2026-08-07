import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormData } from "../validation/auth.schema";

import AuthLayout from "../layouts/AuthLayout";

import { loginUser } from "../services/auth.service";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const result = await loginUser(data);

      login(result.token, result.user);

      toast.success("Login Successful");

      switch (result.user.role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "MANAGER":
          navigate("/manager/dashboard");
          break;

        case "DEVELOPER":
          navigate("/developer/dashboard");
          break;

        case "QA":
          navigate("/qa/dashboard");
          break;

        default:
          navigate("/login");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Login to continue">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="Password"
          margin="normal"
          type={showPassword ? "text" : "password"}
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

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? "Logging In..." : "Login"}
        </Button>

        <Box
          sx={{
            textAlign: "center",
            mt: 3,
          }}
        >
          Don't have an account?{" "}
          <Link component="button" onClick={() => navigate("/signup")}>
            Create Account
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Login;
