import Header from "../DashboardHeader"
import { Box } from "@mui/material"
import { useState } from 'react'

interface DatabaseProps {
    handleDrawerToggle: () => void;
}

export default function Database(props: DatabaseProps){
    

    const {handleDrawerToggle, ...other} = props
    const [pageContent, setPageContent] = useState(<h1>DataBase 1</h1>)
    const setPageContentHandler = (input: any) =>{
        setPageContent(input)
    }
        
    return (
        <div>
            <Header tabSelect = {setPageContentHandler} selection = "Database" onDrawerToggle={handleDrawerToggle} />
            <Box sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
               {pageContent}
            </Box>
        </div>
       
)};