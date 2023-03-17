import Header from "../DashboardHeader"
import { Box } from "@mui/material"

interface AnalyticsProps {
    handleDrawerToggle: () => void;
}

export default function Analytics(props: AnalyticsProps){
    
    const {handleDrawerToggle, ...other} = props
        
    return (
        <div>
            <Header selection = "Analytics" onDrawerToggle={handleDrawerToggle} />
            <Box sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                <h1>selection here</h1>
            </Box>
        </div>
       
)};