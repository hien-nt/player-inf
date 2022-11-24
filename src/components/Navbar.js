import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export default function ButtonAppBar() {
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
           
          </IconButton>
          
          <ul>
        <li>
          <Link to="/">
          <AccessTimeIcon />
            Home
          </Link>
        </li>
        </ul>
        <Button color="inherit">Login</Button>

          {/* <Button color="inherit">Login</Button> */}
          <div id="buttonDiv"></div>
          {Object.keys(user).length != 0 && (
            <button onClick={handleLogOut}>logout</button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
