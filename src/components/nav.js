import React from 'react';

import { Tabs, Tab, AppBar } from '@material-ui/core';
import { Route, Link } from 'react-router-dom';

export default function Navbar() {
    const routes = ['/signup','/login','/details'];

    return (
        <div>
            <Route path='/' render={(history) => (
                <AppBar>
                <Tabs value={history.location.pathname}> 
                    <Tab label="signup" value={routes[0]} component={Link} to={routes[0]} />
                    <Tab label="login" value={routes[1]} component={Link} to={routes[1]} />
                    <Tab label="details" value={routes[2]} component={Link} to={routes[2]} />
                </Tabs>
            </AppBar>
            )}
            
            />
        </div>

    );
}