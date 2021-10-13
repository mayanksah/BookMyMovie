import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    width: 1000,
    height: 1050,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
});

export default function ReleasedMovies({ movieData }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={350} cols={4}>
        {movieData.map((tile) => {
          var expectedDate = new Date(tile.release_date).toDateString();

          return (
            <GridListTile key={tile.id}>
              <Link to={"/movie-details/" + tile.id}>
                <img
                  src={tile.poster_url}
                  alt={tile.title}
                  style={{
                    width: "100%",
                    alignItems: "center",
                    margin: "0px",
                  }}
                />
              </Link>
              <GridListTileBar
                title={tile.title}
                subtitle={<span>Release Date: {expectedDate}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${tile.title}`}
                    className={classes.icon}
                  />
                }
              />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}
