import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function DefaultChartsTab() {
    const [openItemId, setOpenItemId] = useState<string | null>(null);

    const toggleSubMenu = (itemId: string) => {
        if (openItemId === itemId) {
            setOpenItemId(null);
        } else {
            setOpenItemId(itemId);
        }
    };

    interface ClientData {
        name: string;
        phone: number;
        tanksIDs: number[];

    }

    const clientDataObj: ClientData[]= [
        {
            name: "doe, John",
            phone: 1231231234,
            tanksIDs: [1,2,3,4],
        },
        {
            name: "Mitchell, Will",
            phone: 1231231234,
            tanksIDs: [5],

        },
        {
            name: "Martinez, Carlos",
            phone: 1231231234,
            tanksIDs: [6,7],
            
        },
        {
            name: "Hocker, Harry",
            phone: 1231231234,
            tanksIDs: [8],
      
        },
        {
            name: "Thomar, Harmeyer",
            phone: 1231231234,
            tanksIDs: [9,10,11,12,13],
            
        },
    ]

    const [listToggle, setListToggle] = useState(true)

    const handleListToggle = () =>{
        setListToggle(!listToggle);
    }

    const handleRequestChart = (tankID:number) =>{
        console.log("TankID: " + tankID)
        // make api call for data

        // let data = apiCall();
        // data = formatChartdata(data);
        // setFormattedData(data);
        setListToggle(false);
    }

    return (
        <div>
            
            <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                Clients <IconButton onClick={handleListToggle}><MenuIcon/></IconButton>
            </ListSubheader>
            }
            >
                <Collapse in = {listToggle}>
                    {clientDataObj.map(({ name, tanksIDs}, key) => (
                        <div>
                            <ListItemButton onClick={() => toggleSubMenu(name)} key = {name}>
                                <ListItemText primary={"Name: " + name } />
                                {(name === openItemId) ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>

                            <Collapse in={name === openItemId} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {tanksIDs.map((tankID) => (
                                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleRequestChart(tankID)} key = {tankID}>
                                            <ListItemText primary={tankID} />
                                        </ListItemButton>
                                    ))}
                                    
                                </List>
                            </Collapse>
                        </div>
                    ))}
                </Collapse>            
            </List>
        </div>
        
    );
    }