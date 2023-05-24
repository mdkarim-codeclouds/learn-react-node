import * as React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { notifySuccess, notifyError } from '../notify/index';
import { login } from '../api/auth';
import { validateEmail } from '../util/index';
import { setUserData, isUserLogin } from '../storage/index';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        if (isUserLogin()) {
            navigate('/');
        }
        document.title = "React Node | Login";
    });
    const [loading, setLoading] = useState(false);
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
        if (!validateEmail(email)){
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
            setLoading(true);
            login({ email: email, password: password }).then((res) => {
                notifySuccess('Login succeed');
                setUserData(res.data);
                window.location = "/";
            }).catch((err) => {
                if (err.data) {
                    notifyError(err.data.message);
                }
            }).finally(() => {
                setLoading(false);
            });
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
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Container>
        </ThemeProvider>
    );
}