import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DisplayApp from './DisplayApp';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link variant='contained' color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [dataValidation, setDatasValidation] = React.useState(true);
  const [displayApp, setDisplayApp] = React.useState(false);

  const [graph, updateGraph] = React.useState({
    nodes: [], 
    edges: []
  })

  const [option, changeOption] = React.useState({
    height: "900px",
    layout: {
        hierarchical: false
    },
    interaction: {
      hover: true,
      select: true,
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fetch(`/verifyUserExistance?userEmail=${data.get("email")}`, {
      method: 'GET',
      headers: {
          'Content-type': 'application/json'
      }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error: the network response wasn't ok");
        }
        return response.text();
    })
    .then((res) => {
        const jsonRes = JSON.parse(res);
        if (jsonRes.message === "User not found") {
          alert("The email is not correct.")
          setDisplayApp(false);
        } else {
          console.log(typeof(jsonRes));
          if (jsonRes.message.password === data.get("password")) {
            setDisplayApp(true);
          } else{
            setDisplayApp(false);
            alert("The password is not correct.")
          }
        }
    })
    .catch((error) => {
      console.log("Error: ", error)
    });
  };

  return ( displayApp ? 
    <DisplayApp graph={graph} updateGraph={updateGraph} option={option} changeOption={changeOption} /> 
    :
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/*<FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />*/}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              {/*<Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>*/}
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}