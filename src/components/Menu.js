import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";



const pages = [
    { text: 'Home', href: '/' },
    { text: 'Famous Player', href: '/famous-player' },
    { text: 'Contact', href: '/contact' },
    { text: 'Add New Player', href: '/add-player' },
    { text: 'Dashboard', href: '/dashboard' }
  ];

function ResponsiveAppBar() {
    const [user, setUser] = useState({});
    // console.log(user);
    const handleCredentialResponse = (response) => {
      console.log("Encoded JWT ID token: " + response.credential);
      var decoded = jwt_decode(response.credential);
      console.log(decoded);
      setUser(decoded);
      console.log(user);
      document.getElementById("buttonDiv").hidden = true;
    };
  
    const handleLogOut = (e) => {
      setUser({});
      // console.log(user);
      document.getElementById("buttonDiv").hidden = false;
    };
  
    useEffect(() => {
      /* global google*/
      window.onload = function () {
        google.accounts.id.initialize({
          client_id:
            "311962869307-mft3rs2v9v999t0r8vun62k1am4ok7bf.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { theme: "outline", size: "large" } // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
      };
    }, []);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SportsSoccerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            // component="a"
            // href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >

            PlayerINF
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon /> 
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} >
                  <Typography textAlign="center">
                    <Link style={{textDecoration:"none", color:"white",}} to={`${page.href}`}>{page.text}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> 

          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                // key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                    <Link style={{textDecoration:"none", color:"white",}}  to={`${page.href}`}>{page.text}</Link>
              </Button>
            ))}
          </Box>

         
           <div id="buttonDiv"></div>
          {Object.keys(user).length != 0 && (
            // <button onClick={handleLogOut}>logout</button>
            <Button onClick={handleLogOut} variant="contained">LOGOUT</Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;