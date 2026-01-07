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
  Fade,
  Zoom,
  Chip,
  Autocomplete,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  EyeIcon as Eye,
  EyeSlashIcon as EyeSlash,
  UserCircleIcon as User,
  BriefcaseIcon as Briefcase,
  MapPinIcon as MapPin,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { signUpUser } from "@/lib/auth.service";

// Zod validation schema
const schema = zod.object({
  email: zod.string().min(1, { message: "Email is required" }).email(),
  first_name: zod.string().min(1, { message: "First name is required" }),
  last_name: zod.string().min(1, { message: "Last name is required" }),
  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  job_titles: zod
    .array(zod.string())
    .min(1, { message: "At least one job title is required" }),
  work_location: zod
    .array(zod.string())
    .min(1, { message: "At least one location is required" }),
});

export type Values = zod.infer<typeof schema>;

const defaultValues = {
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  job_titles: [],
  work_location: [],
} satisfies Values;

// Sample options
const jobTitleOptions = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Product Manager",
  "UI/UX Designer",
  "QA Engineer",
  "Mobile Developer",
];

const locationOptions = [
  "Remote",
  "Hybrid",
  "New York, NY",
  "San Francisco, CA",
  "Austin, TX",
  "Seattle, WA",
  "Boston, MA",
  "Chicago, IL",
  "Los Angeles, CA",
  "Denver, CO",
];

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

  const onSubmit = async (values: Values) => {
    setIsPending(true);
    try {
      // Transform form data to match API expectations
      const payload = {
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        preferences: {
          job_titles: values.job_titles,
          work_location: values.work_location,
        },
      };

      console.log("Payload:", payload);
      const response = await signUpUser(payload);

      if (response.success) {
        // Navigate to login on success
        navigate("/auth/signin");
      } else {
        // Show error message from API
        setError("root", {
          type: "server",
          message: response.message || "Signup failed",
        });
      }
    } catch (error) {
      setError("root", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up");
  };

  return (
    <Box
      className="h-full overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center"
      sx={{ minHeight: "100vh" }}
    >
      <Container maxWidth="lg" className="py-4 px-4">
        <Fade in timeout={600}>
          <Box className="flex items-center justify-center">
            {/* Signup Form */}
            <Zoom in timeout={800}>
              <Paper
                elevation={0}
                className="w-full max-w-2xl p-6 md:p-8 rounded-2xl bg-white border border-gray-200 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                    <User size={20} weight="bold" className="text-white" />
                  </div>
                  <Typography variant="h4" className="font-bold text-gray-800">
                    Create Account
                  </Typography>
                </div>

                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  {/* Name Fields Row */}
                  <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <Controller
                      name="first_name"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.first_name)}
                          fullWidth
                        >
                          <InputLabel className="font-medium">
                            First Name
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            label="First Name"
                            type="text"
                            placeholder="John"
                            className="rounded-xl transition-all duration-200"
                            sx={{
                              bgcolor: "white",
                              "& fieldset": {
                                borderColor: "#e5e7eb",
                                borderWidth: "2px",
                              },
                              "&:hover fieldset": {
                                borderColor: "#3b82f6",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#3b82f6",
                                borderWidth: "2px",
                              },
                            }}
                          />
                          {errors.first_name && (
                            <FormHelperText className="ml-1 text-sm">
                              {errors.first_name.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />

                    {/* Last Name */}
                    <Controller
                      name="last_name"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.last_name)}
                          fullWidth
                        >
                          <InputLabel className="font-medium">
                            Last Name
                          </InputLabel>
                          <OutlinedInput
                            {...field}
                            label="Last Name"
                            type="text"
                            placeholder="Doe"
                            className="rounded-xl transition-all duration-200"
                            sx={{
                              bgcolor: "white",
                              "& fieldset": {
                                borderColor: "#e5e7eb",
                                borderWidth: "2px",
                              },
                              "&:hover fieldset": {
                                borderColor: "#3b82f6",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#3b82f6",
                                borderWidth: "2px",
                              },
                            }}
                          />
                          {errors.last_name && (
                            <FormHelperText className="ml-1 text-sm">
                              {errors.last_name.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </Box>

                  {/* Email Field */}
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.email)} fullWidth>
                        <InputLabel className="font-medium">
                          Email Address
                        </InputLabel>
                        <OutlinedInput
                          {...field}
                          label="Email Address"
                          type="email"
                          placeholder="john.doe@example.com"
                          className="rounded-xl transition-all duration-200"
                          sx={{
                            bgcolor: "white",
                            "& fieldset": {
                              borderColor: "#e5e7eb",
                              borderWidth: "2px",
                            },
                            "&:hover fieldset": {
                              borderColor: "#3b82f6",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#3b82f6",
                              borderWidth: "2px",
                            },
                          }}
                        />
                        {errors.email && (
                          <FormHelperText className="ml-1 text-sm">
                            {errors.email.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />

                  {/* Password Field */}
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.password)} fullWidth>
                        <InputLabel className="font-medium">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          {...field}
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Minimum 8 characters"
                          className="rounded-xl transition-all duration-200"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                size="small"
                                className="hover:bg-gray-100 transition-colors duration-200"
                              >
                                {showPassword ? (
                                  <EyeSlash
                                    size={20}
                                    className="text-gray-600"
                                  />
                                ) : (
                                  <Eye size={20} className="text-gray-600" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          sx={{
                            bgcolor: "white",
                            "& fieldset": {
                              borderColor: "#e5e7eb",
                              borderWidth: "2px",
                            },
                            "&:hover fieldset": {
                              borderColor: "#3b82f6",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#3b82f6",
                              borderWidth: "2px",
                            },
                          }}
                        />
                        {errors.password && (
                          <FormHelperText className="ml-1 text-sm">
                            {errors.password.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />

                  {/* JOB TITLES */}
                  <Controller
                    name="job_titles"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl fullWidth error={!!errors.job_titles}>
                        <Autocomplete
                          multiple
                          options={jobTitleOptions}
                          value={value || []}
                          onChange={(_, newValue) => onChange(newValue)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Job Titles"
                              placeholder="Select job titles"
                              error={!!errors.job_titles}
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <>
                                    <Briefcase
                                      size={18}
                                      className="text-gray-400 ml-3 mr-1"
                                    />
                                    {params.InputProps.startAdornment}
                                  </>
                                ),
                              }}
                            />
                          )}
                          renderTags={(value, getTagProps) => (
                            <Tooltip title={value.join(", ")} arrow>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "nowrap",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  maxHeight: "32px",
                                }}
                              >
                                {value.slice(0, 2).map((option, index) => (
                                  <Chip
                                    label={option}
                                    {...getTagProps({ index })}
                                    key={option}
                                    size="small"
                                    className="bg-blue-100 text-blue-700 mr-1"
                                  />
                                ))}
                                {value.length > 2 && (
                                  <Chip
                                    label={`+${value.length - 2}`}
                                    size="small"
                                    className="bg-blue-200 text-blue-800"
                                  />
                                )}
                              </Box>
                            </Tooltip>
                          )}
                        />
                        <FormHelperText>
                          {errors.job_titles?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />

                  {/* WORK LOCATIONS */}
                  <Controller
                    name="work_location"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl fullWidth error={!!errors.work_location}>
                        <Autocomplete
                          multiple
                          options={locationOptions}
                          value={value || []}
                          onChange={(_, newValue) => onChange(newValue)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Work Location Preferences"
                              placeholder="Select locations"
                              error={!!errors.work_location}
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <>
                                    <MapPin
                                      size={18}
                                      className="text-gray-400 ml-3 mr-1"
                                    />
                                    {params.InputProps.startAdornment}
                                  </>
                                ),
                              }}
                            />
                          )}
                          renderTags={(value, getTagProps) => (
                            <Tooltip title={value.join(", ")} arrow>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "nowrap",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  maxHeight: "32px",
                                }}
                              >
                                {value.slice(0, 2).map((option, index) => (
                                  <Chip
                                    label={option}
                                    {...getTagProps({ index })}
                                    key={option}
                                    size="small"
                                    className="bg-green-100 text-green-700 mr-1"
                                  />
                                ))}
                                {value.length > 2 && (
                                  <Chip
                                    label={`+${value.length - 2}`}
                                    size="small"
                                    className="bg-green-200 text-green-800"
                                  />
                                )}
                              </Box>
                            </Tooltip>
                          )}
                        />
                        <FormHelperText>
                          {errors.work_location?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />

                  {/* Server Error Alert */}
                  {errors.root && (
                    <Fade in>
                      <Alert severity="error" className="rounded-xl">
                        {errors.root.message}
                      </Alert>
                    </Fade>
                  )}

                  {/* Register Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isPending}
                    className="py-4 text-base font-semibold normal-case rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    sx={{
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                      },
                      "&:disabled": {
                        background: "#e5e7eb",
                        color: "#9ca3af",
                      },
                    }}
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Creating Account...
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <Divider className="my-2">
                    <Typography
                      variant="body2"
                      className="text-gray-500 font-medium"
                    >
                      Or sign up with
                    </Typography>
                  </Divider>

                  {/* Google Sign-up Button */}
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleGoogleSignUp}
                    type="button"
                    disabled={isPending}
                    startIcon={
                      <Box
                        component="img"
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%234285F4' d='M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z'/%3E%3Cpath fill='%2334A853' d='M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z'/%3E%3Cpath fill='%23FBBC05' d='M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z'/%3E%3Cpath fill='%23EA4335' d='M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z'/%3E%3C/svg%3E"
                        alt="Google"
                        className="w-5 h-5"
                      />
                    }
                    className="py-3.5 text-base font-medium normal-case rounded-xl border-2 transition-all duration-300 hover:shadow-md"
                    sx={{
                      borderColor: "#e5e7eb",
                      color: "#374151",
                      "&:hover": {
                        borderColor: "#3b82f6",
                        bgcolor: "rgba(59, 130, 246, 0.04)",
                      },
                      "&:disabled": {
                        borderColor: "#e5e7eb",
                        color: "#9ca3af",
                      },
                    }}
                  >
                    Sign up with Google
                  </Button>

                  {/* Login Link */}
                  <Box className="text-center mt-4 pt-4 border-t border-gray-200">
                    <Typography variant="body2" className="text-gray-600">
                      Already have an account?{" "}
                      <Link
                        onClick={() => navigate("/auth/signin")}
                        className="font-semibold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors duration-200"
                      >
                        Login
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Zoom>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
