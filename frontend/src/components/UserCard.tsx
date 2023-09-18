import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; 
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { UserOption } from '../redux/slices/users/userManagementSlice';

export interface UserCardProps {
    user:UserOption |null 
}

export default function UserCard (props:UserCardProps){
    const { user } = props
    
    return(
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: '100%',
                height: 128,
                },
            }}
            >
            <Paper elevation={32} sx={{backgroundColor:'white'}}>
                <Box sx={{margin:'2%'}}>

                    <Box sx={{float:'left', marginTop:'auto', marginAuto:'auto'}}>

                    <Typography variant="subtitle1" component="h2">
                        {user?.firstName + " " + user?.lastName}
                    </Typography>
                    <Typography variant="subtitle1" component="h2">
                        {user?.address}
                    </Typography>
                    <Typography variant="subtitle1" component="h2">
                        {user?.phone}
                    </Typography>
                    
                    </Box>
                    <Box sx={{float:'right'}}>
                        <Button variant="contained" ><ModeEditOutlineOutlinedIcon/></Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}