import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import { CardActionArea } from '@mui/material';
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";

import ModelCase from "./ModelCase";


export default function DetailPresent() {
  const param = useParams();
  const idPlayer = param.id;
  const baseURL = "https://63686af6454fd07e12806b04.mockapi.io/dbPlayers";
  const [player, setPlayer] = useState("");

  // const fetchPlayer = () => {
  //   fetch(baseURL+"/"+idPlayer)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP Status: ${response.status}`);
  //       }
  //       // console.log("body useeffect");

  //       return response.json();
  //     })
  //     .then((data) => {
  //       setPlayer(data);
  //       console.log(player)
  //     })
  //     .catch((error) => console.log(error.message));
  // };
  useEffect(() => {
    fetch(baseURL + "/" + idPlayer)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        // console.log("body useeffect");

        return response.json();
      })
      .then((data) => {
        setPlayer(data);
      })
      .catch((error) => console.log(error.message));
  }, []);
  console.log(player);

  const [isOpen, setIsOpen] = useState(false);

  return (
    // <div>Hello</div>
    <>
      {isOpen && <ModelCase setIsOpen={setIsOpen} player={player} />}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "1rem" }}
      >
        <Grid item xs={7}>
          <Card sx={{ maxWidth: 780 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                // height="140"
                image={player.img}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {player.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {player.info}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={() => setIsOpen(true)} size="small" color="primary">
                Watch Trailer
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
