import React, { Fragment, useState } from "react";
import {
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
  FormControl,
} from "@material-ui/core";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import TabPanel from "../tabPanel/TabPanel";
import "./Header.css";

//Header.JS   common functionality

const Header = ({ bookShow, bookShowId }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [login, setLogin] = useState(true);
  const [success, setSuccess] = useState(false);

  const loginHandler = () => {
    setLoginOpen(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loginFormHandler = () => {
    setLogin(false);
    setLoginOpen(false);
  };

  const registerFormHandler = () => {
    setLogin(false);
    setSuccess(true);
  };

  return (
    <Fragment>
      <div className="header">
        <Link to="/">
          <img className="logo" src={Logo} alt="logo" />
        </Link>
        <div className="button-group">
          {login ? (
            <Button variant="contained" name="Login" onClick={loginHandler}>
              Login
            </Button>
          ) : (
            <Button
              variant="contained"
              name="Logout"
              onClick={() => {
                setLogin(true);
              }}
            >
              Logout
            </Button>
          )}

          {bookShow ? (
            <Link
              to={"/book-show/" + bookShowId}
              style={{ textDecoration: "none" }}
            >
              <Button variant="contained" name="Book Show" color="primary">
                Book Show
              </Button>
            </Link>
          ) : null}
        </div>
      </div>

      <Modal
        isOpen={loginOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "500px",
            right: "500px",
            bottom: "40px",
            width: "300px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <TextField label="Username" required style={{ margin: "5px 0px" }} />
          <TextField
            label="Password"
            required
            type="password"
            style={{ margin: "5px 0px" }}
          />
          <Button
            variant="contained"
            onClick={loginFormHandler}
            color="primary"
            style={{ margin: "20px 20px" }}
          >
            Login
          </Button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TextField
            label="First Name"
            required
            style={{ margin: "5px 0px" }}
          />
          <TextField label="Last Name" style={{ margin: "5px 0px" }} />
          <TextField label="Email" required style={{ margin: "5px 0px" }} />
          <TextField
            label="Password"
            required
            type="password"
            style={{ margin: "5px 0px" }}
          />
          <TextField
            label="Contact No"
            required
            style={{ margin: "5px 0px" }}
          />
          {success ? (
            <Typography variant="subtitle1" gutterBottom>
              Registration Successful. Please login!
            </Typography>
          ) : null}
          <Button
            variant="contained"
            onClick={registerFormHandler}
            color="primary"
            style={{ margin: "20px 20px" }}
          >
            Register
          </Button>
        </TabPanel>
      </Modal>
    </Fragment>
  );
};

export default Header;
