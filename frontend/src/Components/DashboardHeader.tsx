import ServiceForm from "./DashboardContent/ManagerialTabs/ServiceForm";
import TabPanel from "./DashboardContent/TabPanel";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import * as React from "react";
import { Box } from "@mui/material";

// const lightColor = "rgba(255, 255, 255, 0.7)"; TODO

// ChildId acts as Label for tab
const headerOptions = [
  {
    id: "Managerial",
    children: [
      { childId: "ServiceForm", component: <ServiceForm />, active: 0 },
      { childId: "Man tab 2", component: <h1>man tab 2</h1>, active: 1 },
      { childId: "Man tab 3", component: <h1>man tab 3</h1>, active: 2 },
    ],
  },
  {
    id: "Database",
    children: [
      { childId: "Dat tab 1", component: <h1>Dat tab 1</h1>, active: 0 },
      { childId: "Dat tab 2", component: <h1>Dat tab 2</h1>, active: 1 },
      { childId: "Dat tab 3", component: <h1>Dat tab 3</h1>, active: 2 },
    ],
  },
  {
    id: "Analytics",
    children: [
      { childId: "Anal tab 1", component: <h1>Anal tab 1</h1>, active: 0 },
      { childId: "Anal tab 2", component: <h1>Anal tab 2</h1>, active: 1 },
      { childId: "Anal tab 3", component: <h1>Anal tab 3</h1>, active: 2 },
    ],
  },
];

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type HeaderProps = {
  // tabSelect: any; // (input:React.FC) => void | any; // any until
  selection: string;
};

export default function Header(props: HeaderProps) {
  // Pull selection and onDrawerToggle from props
  // const { tabSelect, selection } = props;
  const { selection } = props;

  // get the header settings that match the current
  const headerSettings = headerOptions.find((item) => item.id === selection);

  // State for tracking current active tab for STYLING
  const [activeIndex, setActiveIndex] = useState(0);

  // When clicking a tab, invoke this function to select the tab and change the styling to indicate active tab
  // const choseTab = (input: any, index: number) => {
  //   tabSelect(input);
  //   setActiveIndex(index);
  // };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveIndex(newValue);
  };

  return (
    <React.Fragment>
      <AppBar
        component="div"
        color="primary"
        position="sticky"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {selection}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeIndex}
          onChange={handleChange}
          aria-label="admin tabs"
        >
          {headerSettings?.children.map(({ childId, active }) => (
            <Tab key={childId} label={childId} {...a11yProps(active)} />
          ))}
        </Tabs>
      </Box>

      {headerSettings?.children.map(({ childId, component, active }) => (
        <TabPanel key={childId} value={activeIndex} index={active}>
          {component}
        </TabPanel>
      ))}
    </React.Fragment>
  );
}
