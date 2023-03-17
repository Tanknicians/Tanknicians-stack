import Header from "../DashboardHeader"
import { Box } from "@mui/material"

interface ManagerialProps {
    handleDrawerToggle: () => void;
}

export default function Managerial(props: ManagerialProps){
    
    const {handleDrawerToggle, ...other} = props

    return (
        <div>
            <Header selection = "Managerial" onDrawerToggle={handleDrawerToggle} />
            <Box sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                <h1>selection here</h1>
            </Box>
        </div>
       
)};