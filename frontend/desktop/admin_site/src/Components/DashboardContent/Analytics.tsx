import Header from "../DashboardHeader";
import { Box } from "@mui/material";
import { useState } from "react";

interface AnalyticsProps {
    handleDrawerToggle: () => void;
}

export default function Analytics(props: AnalyticsProps){
    
    const {handleDrawerToggle, ...other} = props
    const [pageContent, setPageContent] = useState(<h1>hi</h1>)
    const setPageContentHandler = (input: any) =>{
        setPageContent(input)
    }
        
    return (
        <div>
            <Header tabSelect = {setPageContentHandler} selection = "Analytics" onDrawerToggle={handleDrawerToggle} />
            <Box sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                {pageContent}
            </Box>
        </div>
       
)};