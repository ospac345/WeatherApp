import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import CustomizedMenus from './CustomizedMenu';

const drawerWidth = 240;


function DrawerAppBar(props) {
    const { window } = props;


    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <div className="logo-parent-box">
                        <div className="logo">
                            <span className="logo-text">WeatherWise</span>
                        </div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                        <CustomizedMenus />
                    </div>

                </Toolbar>


            </AppBar>

            <Box component="main" sx={{ p: 1 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}

export default DrawerAppBar;
