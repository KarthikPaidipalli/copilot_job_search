import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Link,
  Divider,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import {
  EyeIcon as Eye,
  EyeSlashIcon as EyeSlash,
  CheckIcon as Check,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";

// Zod validation schema
const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
  password: zod.string().min(1, { message: "Password is required" }),
});

export type Values = zod.infer<typeof schema>;

const defaultValues = { email: "", password: "" } satisfies Values;

export function Page(): React.JSX.Element {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      try {
        // Add your login API call here
        console.log("Login with:", values);

        // Example API call:
        // const { success, loginData, message } = await loginApi(values);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock successful login
        const success = true;

        if (success) {
          // Store tokens and user data
          // setRefreshToken(loginData?.refreshToken);
          // setAccessToken(loginData?.accessToken);
          // setUserDetails(JSON.stringify(loginData));

          navigate("/dashboard");
        } else {
          setError("root", {
            type: "server",
            message: "Invalid credentials. Please try again.",
          });
        }
      } catch (error) {
        setError("root", {
          type: "server",
          message: "An error occurred. Please try again.",
        });
      } finally {
        setIsPending(false);
      }
    },
    [setError, navigate]
  );

  const handleGoogleSignIn = () => {
    console.log("Google sign in");
  };

  return (
    <Box
      sx={{
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            mt: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Left Section - Only visible on desktop */}
          {!isMobile && (
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                maxWidth: 480,
                p: 4,
                borderRadius: 2,
                bgcolor: "#f8f8f9",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: "#1a1a1a",
                }}
              >
                New to job copilot?
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                >
                  <Check size={20} color="#4caf50" weight="bold" />
                  <Typography variant="body2" color="text.secondary">
                    One click apply using job copilot profile.
                  </Typography>
                </Box>

                <Box
                  sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                >
                  <Check size={20} color="#4caf50" weight="bold" />
                  <Typography variant="body2" color="text.secondary">
                    Get relevant job recommendations.
                  </Typography>
                </Box>

                <Box
                  sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                >
                  <Check size={20} color="#4caf50" weight="bold" />
                  <Typography variant="body2" color="text.secondary">
                    Showcase profile to top companies and consultants.
                  </Typography>
                </Box>

                <Box
                  sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                >
                  <Check size={20} color="#4caf50" weight="bold" />
                  <Typography variant="body2" color="text.secondary">
                    Know application status on applied jobs.
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  onClick={() => navigate("/auth/signup")}
                  sx={{
                    mt: 2,
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderColor: "#1976d2",
                    color: "#1976d2",
                    borderRadius: 2,
                    "&:hover": {
                      borderColor: "#1565c0",
                      bgcolor: "rgba(25, 118, 210, 0.04)",
                    },
                  }}
                >
                  Register for Free
                </Button>
              </Box>
            </Paper>
          )}

          {/* Right Section - Login Form */}
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              maxWidth: 480,
              p: { xs: 3, md: 4 },
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              width: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: "#1a1a1a",
              }}
            >
              Login
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
              {/* Email/Username Field */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <FormControl error={Boolean(errors.email)} fullWidth>
                    <InputLabel>Email ID / Username</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Email ID / Username"
                      type="text"
                      placeholder="Enter Email ID / Username"
                      sx={{
                        bgcolor: "white",
                        "& fieldset": {
                          borderColor: "#d0d0d0",
                        },
                        "&:hover fieldset": {
                          borderColor: "#1976d2",
                        },
                      }}
                    />
                    {errors.email && (
                      <FormHelperText>{errors.email.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              {/* Password Field */}
              <Box>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.password)} fullWidth>
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        {...field}
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              size="small"
                            >
                              {showPassword ? (
                                <EyeSlash size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        sx={{
                          bgcolor: "white",
                          "& fieldset": {
                            borderColor: "#d0d0d0",
                          },
                          "&:hover fieldset": {
                            borderColor: "#1976d2",
                          },
                        }}
                      />
                      {errors.password && (
                        <FormHelperText>
                          {errors.password.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Box sx={{ textAlign: "right", mt: 0.5 }}>
                  <Link
                    href="#"
                    underline="hover"
                    sx={{
                      fontSize: "0.875rem",
                      color: "#1976d2",
                      fontWeight: 500,
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>
              </Box>

              {/* Server Error Alert */}
              {errors.root && (
                <Alert severity="error">{errors.root.message}</Alert>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isPending}
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  bgcolor: "#1976d2",
                  borderRadius: 2,
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#1565c0",
                    boxShadow: "none",
                  },
                  "&:disabled": {
                    bgcolor: "#ccc",
                  },
                }}
              >
                {isPending ? "Logging in..." : "Login"}
              </Button>

              <Divider sx={{ my: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Or
                </Typography>
              </Divider>

              {/* Google Sign-in Button */}
              <Button
                variant="outlined"
                fullWidth
                onClick={handleGoogleSignIn}
                type="button"
                disabled={isPending}
                startIcon={
                  <Box
                    component="img"
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%234285F4' d='M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z'/%3E%3Cpath fill='%2334A853' d='M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z'/%3E%3Cpath fill='%23FBBC05' d='M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z'/%3E%3Cpath fill='%23EA4335' d='M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z'/%3E%3C/svg%3E"
                    alt="Google"
                    sx={{ width: 20, height: 20 }}
                  />
                }
                sx={{
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  borderColor: "#d0d0d0",
                  color: "#5f6368",
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "#1976d2",
                    bgcolor: "rgba(25, 118, 210, 0.04)",
                  },
                  "&:disabled": {
                    borderColor: "#e0e0e0",
                    color: "#999",
                  },
                }}
              >
                Sign in with Google
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
