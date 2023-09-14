import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import CustomizedMenus from './CustomizedMenu';
import SearchModal from './SearchModal';
import { Link } from '@mui/material';


function DrawerAppBar() {

    return (
        <Box sx={{ display: 'flex', paddingBottom: 10 }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <Link href='/' sx={{ textDecoration: 'none' }}>
                        <div className="logo-parent-box">
                            <div className="logo">
                                <span className="logo-text">WeatherWise</span>
                            </div>
                        </div>
                    </Link>
                    <div style={{ marginLeft: 'auto' }}>
                        <SearchModal />
                    </div>
                    <div style={{ marginLeft: '0' }}>
                        <CustomizedMenus />
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default DrawerAppBar;
