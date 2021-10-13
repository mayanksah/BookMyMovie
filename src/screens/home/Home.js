import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Header from "../../common/header/Header";
import Heading from "../../common/heading/Heading";
import { makeStyles } from "@material-ui/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import {
  Card,
  CardContent,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Checkbox,
  Button,
} from "@material-ui/core";
import ReleasedMovies from "./ReleasedMovies";
import "./Home.css";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginBottom: "15px",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },

  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
});

//Logic for Home page of BookMyMovie app

const Home = () => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreChoice, setGenreChoice] = useState([]);
  const [checked, setChecked] = useState(false);
  const [artists, setArtists] = useState([]);
  const [artistChoice, setArtistChoice] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8085/api/v1/movies")
      .then((response) => setData(response.data.movies));

    axios
      .get("http://localhost:8085/api/v1/genres")
      .then((response) => setGenres(response.data.genres));

    axios
      .get("http://localhost:8085/api/v1/artists")
      .then((response) => setArtists(response.data.artists));
  }, []);

  const handleChange = (event) => {
    setGenreChoice(event.target.value);
  };

  const handleArtistChange = (event) => {
    setArtistChoice(event.target.value);
  };

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setGenreChoice(value);
  };

  const handleChangeArtistMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setArtistChoice(value);
  };

  const classes = useStyles();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Fragment>
      <Header bookShow={false} />
      <Heading />
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={6} cellHeight={250}>
          {data.map((tile) => (
            <GridListTile key={tile.id}>
              <img src={tile.poster_url} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={<IconButton aria-label={`star ${tile.title}`} />}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <div className="second-section">
        <div className="released-movies">
          <ReleasedMovies movieData={data} />
        </div>
        <div className="filter-form">
          <Card>
            <CardContent>
              <InputLabel style={{ color: "#4791db" }}>
                FIND MOVIES BY:
              </InputLabel>
              <FormControl style={{ width: "100%", marginTop: "20px" }}>
                <TextField id="standard-basic" label="Movie Name" />
              </FormControl>
              <FormControl style={{ width: "100%", marginTop: "20px" }}>
                <InputLabel id="demo-mutiple-name-label">Genres</InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={genreChoice}
                  onChange={handleChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.genre}>
                      <Checkbox color="primary" />
                      {genre.genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ width: "100%", marginTop: "20px" }}>
                <InputLabel id="demo-mutiple-name-label">Artists</InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={artistChoice}
                  onChange={handleArtistChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {artists.map((artist) => (
                    <MenuItem
                      key={artist.id}
                      value={artist.first_name + " " + artist.last_name}
                    >
                      <Checkbox color="primary" />
                      {artist.first_name + " " + artist.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ width: "100%", marginTop: "20px" }}>
                <TextField
                  name="Release Date Start"
                  id="standard-basic"
                  type="date"
                  label="Release Date Start"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl style={{ width: "100%", marginTop: "20px" }}>
                <TextField
                  name="Release Date End"
                  id="standard-basic"
                  type="date"
                  label="Release Date End"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <div>
                <FormControl style={{ width: "100%", marginTop: "20px" }}>
                  <Button variant="contained" name="Apply" color="primary">
                    Apply
                  </Button>
                </FormControl>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
