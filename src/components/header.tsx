import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import {
  UserIcon as User,
  SignOutIcon as SignOut,
  ListIcon,
  BriefcaseIcon as Briefcase,
  MagnifyingGlassIcon as MagnifyingGlass,
  BookmarkSimpleIcon as BookmarkSimple,
  XIcon as X,
  BuildingsIcon as Buildings,
  GearIcon as Gear,
} from "@phosphor-icons/react";
import { useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    // Add your sign out logic here
    handleMenuClose();
    setMobileMenuOpen(false);
    navigate("/auth/signin");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Check if user is on auth pages
  const isAuthPage = location.pathname.startsWith("/auth");

  // Navigation items for authenticated users
  const navItems = [
    { label: "Jobs", path: "/jobs", icon: <Briefcase size={24} /> },
    { label: "Companies", path: "/companies", icon: <Buildings size={24} /> },
    { label: "Services", path: "/services", icon: <Gear size={24} /> },
  ];

  // Desktop Navigation (Authenticated)
  const DesktopAuthNav = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {navItems.map((item) => (
        <Button
          key={item.path}
          onClick={() => navigate(item.path)}
          sx={{
            fontWeight: 500,
            fontSize: "0.95rem",
            textTransform: "none",
            px: 2,
            color: location.pathname === item.path ? "primary.main" : "inherit",
            bgcolor: location.pathname === item.path ? "white" : "transparent",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          {item.label}
        </Button>
      ))}

      <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
          <User size={20} />
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ mt: 1 }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate("/profile");
          }}
        >
          <ListItemIcon>
            <User size={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate("/applications");
          }}
        >
          <ListItemIcon>
            <ListIcon size={20} />
          </ListItemIcon>
          <ListItemText>Applications</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate("/saved");
          }}
        >
          <ListItemIcon>
            <BookmarkSimple size={20} />
          </ListItemIcon>
          <ListItemText>Saved Jobs</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <SignOut size={20} />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );

  // Mobile Navigation Drawer (Authenticated)
  const MobileAuthDrawer = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      sx={{
        "& .MuiDrawer-paper": {
          width: 280,
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Menu</Typography>
        <IconButton onClick={toggleMobileMenu}>
          <X size={24} />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                toggleMobileMenu();
              }}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/profile");
              toggleMobileMenu();
            }}
          >
            <ListItemIcon>
              <User size={24} />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/applications");
              toggleMobileMenu();
            }}
          >
            <ListItemIcon>
              <ListIcon size={24} />
            </ListItemIcon>
            <ListItemText primary="Applications" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/saved");
              toggleMobileMenu();
            }}
          >
            <ListItemIcon>
              <BookmarkSimple size={24} />
            </ListItemIcon>
            <ListItemText primary="Saved Jobs" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon>
              <SignOut size={24} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );

  // Auth Pages Navigation
  const AuthNav = () => (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        onClick={() => navigate("/auth/signin")}
        sx={{
          fontWeight: 500,
          textTransform: "none",
          fontSize: "0.95rem",
          px: 3,
          borderRadius: 2,
          border: "1px solid white",
          bgcolor:
            location.pathname === "/auth/signin" ? "white" : "transparent",
          color:
            location.pathname === "/auth/signin" ? "primary.main" : "inherit",
          "&:hover": {
            bgcolor:
              location.pathname === "/auth/signin"
                ? "white"
                : "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        Login
      </Button>
      <Button
        onClick={() => navigate("/auth/signup")}
        sx={{
          fontWeight: 600,
          textTransform: "none",
          fontSize: "0.95rem",
          px: 3,
          borderRadius: 2,
          bgcolor: "#ff6b35",
          color: "white",
          "&:hover": {
            bgcolor: "#e55a28",
          },
        }}
      >
        Register
      </Button>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#ffffff" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate("/")}
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "primary.main",
            }}
          >
            <Box
              component="span"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                px: 1,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              J
            </Box>
            jobcopilot
          </Typography>

          {!isAuthPage ? (
            <>
              {isMobile ? (
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={toggleMobileMenu}
                >
                  <MagnifyingGlass size={24} />
                </IconButton>
              ) : (
                <DesktopAuthNav />
              )}
            </>
          ) : (
            <AuthNav />
          )}
        </Toolbar>
      </AppBar>

      {!isAuthPage && isMobile && <MobileAuthDrawer />}
    </>
  );
}
