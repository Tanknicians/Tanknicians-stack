import Header from "../DashboardHeader";
import { Box } from "@mui/material";
import ServiceForms from "./ManagerialTabs/ServiceForms";
import { useState } from 'react';

interface ManagerialProps {
    handleDrawerToggle: () => void;
}

export default function Managerial(props: ManagerialProps){
    
    const {handleDrawerToggle, ...other} = props

    const [pageContent, setPageContent] = useState(<ServiceForms/>)
    const setPageContentHandler = (input: any) =>{
        setPageContent(input)
    }

    return (
        <div>
            <Header tabSelect = {setPageContentHandler} selection = "Managerial" onDrawerToggle={handleDrawerToggle} />
            <Box sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                {pageContent}
            </Box>
        </div>
       
)};