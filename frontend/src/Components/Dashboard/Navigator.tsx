import BorderColorIcon from "@mui/icons-material/BorderColor";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import BadgeIcon from "@mui/icons-material/Badge";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

interface NavProps extends DrawerProps {
  onClose: any | null;
  setSelection: any;
  selected: string;
}
export default function Navigator(props: NavProps) {
  const { onClose, setSelection, selected } = props;

  const dashboardFeatures = [
    {
      id: "",
      children: [
        {
          id: "Approve Forms",
          icon: <BorderColorIcon />,
          onClick: () => {
            setSelection("Approve Forms");
          },
        },
        {
          id: "Clients",
          icon: <PeopleIcon />,
          onClick: () => {
            setSelection("Clients");
          },
        },
        {
          id: "Tanks",
          icon: <ShowChartIcon />,
          onClick: () => {
            setSelection("Tanks");
          },
        },
        {
          id: "Employees",
          icon: <BadgeIcon />,
          onClick: () => {
            setSelection("Employees");
          },
        },
        {
          id: "Data Export",
          icon: <ContentCopyIcon />,
          onClick: () => {
            setSelection("Data Export");
          },
        },
      ],
    },
  ];

  return (
    <Drawer variant="permanent" {...props}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          Tanknicians
        </ListItem>
        {dashboardFeatures.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, onClick }) => (
              <ListItem disablePadding key={childId}>
                <Link
                  to={childId}
                  style={{ textDecoration: "none", minWidth: "100%" }}
                >
                  <ListItemButton
                    selected={childId === selected}
                    sx={item}
                    onClick={() => {
                      onClick();
                      onClose();
                    }}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
