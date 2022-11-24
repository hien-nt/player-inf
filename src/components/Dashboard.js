import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import UserItem from "./UserItem";
export default function PlayersControl() {
  // const [playerId, setplayerId] = useState("");
  const [cost, setCost] = useState("");
  const [club, setClub] = useState("");

  const handleUpdate = (playerId, club, cost) => {
    console.log(playerId);
    console.log(club);
    console.log(cost);
    fetch(baseURL + "/" + playerId, {
      method: "PUT",
      body: JSON.stringify({ club: club, cost: cost }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        recallAPI();
        return response.json();
      })
      // .then((data) => setOpen(true))
      .catch((error) => console.log(error.message));
  };
  // handleUpdate("4", "testupdate")

  // const formik = useFormik({
  //   initialValues: {
  //     cost:0
  //     name:"",
  //     id:playerId,
  //   },
  //   onSubmit: (values) => {
  //     console.log(values.id)
  //     console.log("value in submit - "+values.name);
  //     console.log("value in submit - "+values.id);

  //     fetch(baseURL + "/" + 4, {
  //       method: "PUT",
  //       body: JSON.stringify({ name: values.name }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "same-origin",
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP Status: ${response.status}`);
  //         }
  //         recallAPI();
  //         return response.json();
  //       })
  //       .catch((error) => console.log(error.message));
  //   },
  //   validationSchema: Yup.object({
  //     cost: Yup.number().integer().min(0,"Cost can not be less than 0").typeError("Please type a number."),
  //   }),
  // });

  const [open, setOpen] = useState(false);
  const [idToDelete, setidToDelete] = useState();
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePlayer = (id) => {
    console.log("body delete func");
    // alert(id);
    fetch(baseURL + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      //  credentials: "same-origin",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        recallAPI();
        return response.json();
      })
      //  .then(()=>{
      //   recallAPI();
      //  })
      //  .then((data) => setOpen(true))
      .catch((error) => console.log(error.message));
  };

  const [APIData, setAPIData] = useState([]);

  const baseURL = "https://63686af6454fd07e12806b04.mockapi.io/dbPlayers";

  const recallAPI = () => {
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        // console.log("body useeffect");

        return response.json();
      })
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        console.log("body useeffect");

        return response.json();
      })
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <>
      {APIData.map((data) => {
        return (
          // <UserItem data={data}/>
          <form>
            <ListItem key={data.id}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="large" />
              </ListItemIcon>
              {/* <TextField
                margin="dense"
                name="playerId"
                label="id"
                type="text"
                variant="standard"
                value={data.id}
              /> */}

              <ListItemText primary={data.name} secondary={data.nation} />
              <TextField
              
              style={{marginRight:"1rem"}}
              id="outlined-read-only-input"
              label="Club - Read Only"
              value={data.club}

              // InputProps={{
              //   readOnly: true,
              // }}
              />
              <TextField
              
              style={{marginRight:"9rem"}}
              id="outlined-read-only-input"
              label="Market Value - Read Only"
              value={data.cost}
              // InputProps={{
              //   readOnly: true,
              // }}
              
              />
             

              {/* <ListItemText  primary="Club" secondary={data.club} /> */}
              

              {/* <ListItemText primary="Market Value" secondary={data.cost} /> */}
              {/* <TextField
                margin="dense"
                name="club"
                label="Club"
                type="text"
                // fullWidth
                variant="standard"
                defaultValue={data.club}
                onChange={(e)=> setClub(e.target.value)}
              /> */}

              <TextField
                margin="dense"
                name="club"
                label="Club"
                type="text"
                // fullWidth
                variant="standard"
                defaultValue={data.club}
                onChange={(e) => setClub(e.target.value)}
              />

              <TextField
               style={{marginLeft:"2rem"}}
                margin="dense"
                name="cost"
                label="Cost"
                type="number"
                // fullWidth
                variant="standard"
                defaultValue={data.cost}
                onChange={(e) => setCost(e.target.value)}
              />
              {/* {formik.errors.cost && (
                <Typography variant="caption" color="red">
                  {formik.cost.name}
                </Typography>
              )} */}

              <Button
                onClick={() => {
                  if (club && cost !== "") {
                    handleUpdate(data.id, club, cost);
                  } else if (club && cost === "") {
                    // setClub(data.club);
                    handleUpdate(data.id, data.club, data.cost);
                  } else if (club === "" && cost !== "") {
                    // setClub(data.club);
                    handleUpdate(data.id, data.club, cost);
                  }else if (club !== "" && cost === "") {
                    // setClub(data.club);
                    handleUpdate(data.id, club, data.cost);
                  }
                }}
              >
                Update
              </Button>

              <IconButton
                aria-label="delete"
                color="error"
                // onClick={()=>handleDeletePlayer(data.id)}
                onClick={() => {
                  setOpen(true);
                  setidToDelete(data.id);
                  // dispatch(deleteContact({ id: contact.id }));
                }}
              >
                <DeleteIcon />
                {/* <button onClick={()=>handleDeletePlayer()}>Xóa</button> */}
              </IconButton>
            </ListItem>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Confirm"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Alert severity="error">
                    Are you want to delete this player information ?
                  </Alert>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleDeletePlayer(idToDelete);
                    setOpen(false);
                  }}
                >
                  Delete
                </Button>
                <Button autoFocus onClick={handleClose}>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        );
      })}
    </>
  );
}
