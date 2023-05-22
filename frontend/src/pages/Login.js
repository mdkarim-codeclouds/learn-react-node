import * as React from 'react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
    useEffect(() => {
        document.title = "React Node | Login";
    }, []);
    const [formValues, setFormValues] = useState({
        email: {
            value: '',
            error: false,
            errorMessage: 'Please enter your email'
        },
        password: {
            value: '',
            error: false,
            errorMessage: 'Please enter your password'
        }
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        let formError = false;
        let newFormValues = { ...formValues };
        const data = new FormData(event.currentTarget);
        const email = (data.get('email')).trim();
        const password = (data.get('password')).trim();
        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            newFormValues.email.error = true;
            formError = true;
        } else {
            newFormValues.email.error = false;
        }
        if (password.length < 6) {
            newFormValues.password.error = true;
            formError = true;
        } else {
            newFormValues.password.error = false;
        }
        setFormValues(newFormValues);
        if (!formError){
            console.log(email, password);
        }
    };

    return (
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
                            type="email"
                            autoComplete="email"
                            error={formValues.email.error}
                            helperText={formValues.email.error && formValues.email.errorMessage}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            error={formValues.password.error}
                            helperText={formValues.password.error && formValues.password.errorMessage}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to='/register'>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    );
}