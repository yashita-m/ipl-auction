import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../store/actions/authActions";

import { Avatar, Box, Button, CssBaseline, Grid, Typography, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const formAlignStyle = {
  backgroundColor:'#010202',
  height: '100vh',
  paddingTop: '40px',
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
}


class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div style={formAlignStyle}>
        <CssBaseline />

          <Grid container spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            xs={12}
            md={8}
            lg={4}
            style={{

              backgroundColor: "white",
              left: '50%',
              background: 'rgba(255,255,255)',
              borderRadius: '10px',
              padding: '20px',
            }}
          >

          {/* form header lock icon */}
        <Avatar spacing={1} style={{ backgroundColor: '#f48fb1', color: '#000'  }} >
          <LockOutlinedIcon />
        </Avatar>
      
      {/* form header */}
        <Typography component="h1" variant="h4" style={{fontWeight: '600'}}>Sign Up</Typography>
        <Grid item xs={10} md={6} lg={12}>
          <Box>
            <form onSubmit={this.handleSubmit}>
              
              {/* email */}
            <TextField 
                variant="outlined"
                margin="normal"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                required
                fullWidth

                type="email"
                id="email"
                onChange={this.handleChange}   
              />

              {/* password */}
            <TextField
                variant="outlined"
                margin="normal"
                name="password"
                label="Password"
                autoComplete="current-password"
                required
                fullWidth

                id="password"
                type="password"
                onChange={this.handleChange}
            />

              {/* First Name */}
            <TextField
                  variant="outlined"
                  margin="normal"
                  name="First Name"
                  label="First Name"
                  required
                  fullWidth

                  id="firstName"
                  type="text"
                  onChange={this.handleChange}
            />


              {/* First Name */}
            <TextField
                  variant="outlined"
                  margin="normal"
                  name="Last Name"
                  label="Last Name"
                  required
                  fullWidth

                  type="text" 
                  id="lastName"
                  onChange={this.handleChange}
            />


            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth

                style={{
                  margin: '24px 0px 16px'
                }}
              >
                Sign Up
            </Button>
                            
              <div className="center red-text">
                {authError ? <p>{authError}</p> : null}
              </div>


            </form>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds) => dispatch(signUp(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);