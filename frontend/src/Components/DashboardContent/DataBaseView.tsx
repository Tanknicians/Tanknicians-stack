import Header from "../DashboardHeader";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Database(props: any) {
  // const {handleDrawerToggle, ...other} = props
  // const [pageContent, setPageContent] = useState(<h1>DataBase 1</h1>)
  // const setPageContentHandler = (input: any) =>{
  //     setPageContent(input)
  // }

  return (
    <div>
      {/* <Header tabSelect = {setPageContentHandler} selection = "Database" /> */}
      <Header selection="Database" />
      {/* <Box sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
        {pageContent}
      </Box> */}
    </div>
  );
}
