import React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function PlayersPresent() {
  const [APIData, setAPIData] = useState([]);
  const baseURL = "https://63686af6454fd07e12806b04.mockapi.io/dbPlayers";
  useEffect(() => {
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAPIData(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div style={{ marginLeft: "4rem", marginTop: "2rem" }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        rowSpacing={2}
      >
        {APIData.map((data) => {
          return (
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={data.img}
                  alt={data.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data.club}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">{data.nation}</Button>

                  <Button size="small">
                    <Link
                      style={{ textDecoration: "none", color: "#3379d2" }}
                      to={`detail/${data.id}`}
                    >
                      Detail
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
