import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import CustomizedMenus from './CustomizedMenu';


function DrawerAppBar(props) {

    return (
        <Box sx={{ display: 'flex', paddingBottom: 5 }}>
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
        </Box>
    );
}

export default DrawerAppBar;
