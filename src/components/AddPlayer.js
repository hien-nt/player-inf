import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import { useState } from "react";

export default function AddPlayer() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const baseURL = "https://63686af6454fd07e12806b04.mockapi.io/dbPlayers";
  const formik = useFormik({
    initialValues: {
      name: "",
      nation: "",
      club: "",
      cost: 0,
      clip: "",
      info: "",
      img: "",
      famous: false,
    },
    onSubmit: (values) => {
      fetch(baseURL, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
          }
          formik.handleReset();
          return response.json();
        })
        .then((data) => setOpen(true))
        .catch((error) => console.log(error.message));
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      nation: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      club: Yup.string()
        .required("Required.")
        .min(2, "Must be 2 characters or more"),
      cost: Yup.number().integer().min(0,"Cost can not be less than 0").typeError("Please type a number."),
      info: Yup.string()
        .required("Required.")
        .min(10, "Must be 10 characters or more"),
      clip: Yup.string()
        .required("Required.")
        .min(10, "Must be 10 characters or more"),
      img: Yup.string()
        .required("Required.")
        .min(10, "Must be 10 characters or more"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h3" component="h2" align="center">
        Add Player Form
      </Typography>
      <Grid
        container
        direction="row"
        rowSpacing={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item xs={7}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <Typography variant="caption" color="red">
              {formik.errors.name}
            </Typography>
          )}
        </Grid>

        <Grid item xs={7}>
          <TextField
            margin="dense"
            name="club"
            label="Club"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.club}
            onChange={formik.handleChange}
          />
          {formik.errors.club && (
            <Typography variant="caption" color="red">
              {formik.errors.club}
            </Typography>
          )}
        </Grid>

        <Grid item xs={7}>
          <TextField
            margin="dense"
            name="nation"
            label="Nation"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.nation}
            onChange={formik.handleChange}
          />
          {formik.errors.nation && (
            <Typography variant="caption" color="red">
              {formik.errors.nation}
            </Typography>
          )}
        </Grid>

        <Grid item xs={7}>
          <TextField
            margin="dense"
            name="img"
            label="URL of image"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.img}
            onChange={formik.handleChange}
          />
          {formik.errors.img && (
            <Typography variant="caption" color="red">
              {formik.errors.img}
            </Typography>
          )}
        </Grid>

        <Grid item xs={7}>
          <TextField
            margin="dense"
            name="cost"
            label="Market value"
            type="number"
            
            fullWidth
            variant="standard"
            value={formik.values.cost}
            onChange={formik.handleChange}
          />
          {formik.errors.cost && (
            <Typography variant="caption" color="red">
              {formik.errors.cost}
            </Typography>
          )}
        </Grid>

        <Grid item xs={7}>
          <TextField
            margin="dense"
            name="clip"
            label="Intro video"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.clip}
            onChange={formik.handleChange}
          />
          {formik.errors.clip && (
            <Typography variant="caption" color="red">
              {formik.errors.clip}
            </Typography>
          )}
        </Grid>

        <Grid item xs={7}>
          <TextField
            multiline
            rows={2}
            margin="dense"
            name="info"
            label="Information"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.info}
            onChange={formik.handleChange}
          />
          {formik.errors.info && (
            <Typography variant="caption" color="red" display="block">
              {formik.errors.info}
            </Typography>
          )}
        </Grid>

        <Grid item xs={7}>
          <FormControlLabel
            control={<Switch checked={formik.values.famous}/>}
            label="Top players"
            name="famous"
            value={formik.values.famous}
            onClick={formik.handleChange}
          />
          <br />
        </Grid>
        <Grid item xs={7}>
          <Button variant="contained" size="small" type="submit">
            Add
          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Congraturation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="success">
              <AlertTitle>Adding successful!</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              Dashboard
            </Link>
          </Button> */}
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
