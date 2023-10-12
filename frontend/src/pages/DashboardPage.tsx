import { useGetUserQuery } from "../redux/slices/users/userManagementSlice";
import { selectCurrentUser } from "../redux/slices/auth/authSlice";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Content from "../components/dashboard/ContentRoutes";
import Navigator from "../components/dashboard/Navigator";
import Badge, { BadgeProps } from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as React from "react";
import { useGetUnapprovedServiceCallsQuery } from "../redux/slices/forms/servicecallApiSlice";

let theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#081627",
      dark: "#006db3",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#081627",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#4fc3f7",
            backgroundColor: "rgba(79, 195, 247, .08)",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: "57px", // manual height adjustment for Appbar
          //color: '#081627'
        },
      },
    },
  },
};

const item = {
  borderRadius: "20px",
  padding: "5px",
  fontSize: "40px",
  color: "rgba(255, 255, 255, 1)",
  "&:hover": {
    bgcolor: "rgba(255, 255, 255, .1)", //'rgba(255, 255, 255, 0.08)'
  },
  "&:focus": {
    bgcolor: "rgba(79, 195, 247, .1)", //'rgba(255, 255, 255, 0.08)'
  },
};

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 8,
    top: 13,
  },
}));

const drawerWidth = 256;
const oneMinuteInMilliseconds = 60000;

export default function Paperbase() {
  // Get URL on render
  const urlArray = useLocation().pathname.split("/");
  const selection = urlArray[urlArray.length - 1].replace("%20", " ");

  // Set cleaned URL in state for tab highlight
  // Dashboard level component (bell icon) controlls highlight, so highlight
  // state must be accessanle here
  const [activeNavItem, setActiveNavItem] = React.useState(selection);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const numberOfUnapprovedForms = useGetUnapprovedServiceCallsQuery(undefined, {
    pollingInterval: oneMinuteInMilliseconds,
  }).data?.length;

  // Get user info from redux store
  const loggedInUser = useSelector(selectCurrentUser);
  const { data } = useGetUserQuery(loggedInUser.userId);
  const username = data ? `${data.firstName} ${data.lastName}` : "...";

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* the 100 vh is part of the MUI boilerplate code, pls dont remove without a good reason */}
      <Box sx={{ display: "flex", height: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              setSelection={setActiveNavItem}
              selected={activeNavItem}
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            setSelection={setActiveNavItem}
            selected={activeNavItem}
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppBar color="primary" position="sticky" elevation={0}>
            <Toolbar>
              <Grid container spacing={1} alignItems="center">
                <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    edge="start"
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
                <Grid item xs />
                <Grid item>
                  <Link
                    to="Approve Forms"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <IconButton
                      color="inherit"
                      sx={{ p: 0.5 }}
                      onClick={() => setActiveNavItem("Approve Forms")}
                    >
                      <StyledBadge
                        badgeContent={numberOfUnapprovedForms}
                        color="secondary"
                      >
                        <NotificationsIcon sx={item} />
                      </StyledBadge>
                    </IconButton>
                  </Link>
                </Grid>
                <Grid item>
                  <Typography color="inherit" variant="h6" component="h1">
                    {username}
                  </Typography>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            <Content />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
