import * as React from 'react';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { isUserLogin } from '../storage/index';
import { notifySuccess, notifyError } from '../notify/index';
import { register } from '../api/auth';
import { validateEmail, convertToSlug } from '../util/index';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Register() {
    const navigate = useNavigate();
    useEffect(() => {
        if (isUserLogin()) {
            navigate('/');
        }
        document.title = "React Node | Register";
    }, []);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        name: {
            value: '',
            error: false,
            errorMessage: 'Please enter your name'
        },
        email: {
            value: '',
            error: false,
            errorMessage: 'Please enter your email'
        },
        password: {
            value: '',
            error: false,
            errorMessage: 'Please enter your password'
        },
        confirmPassword: {
            value: '',
            error: false,
            errorMessage: 'Please enter your confirm password'
        }
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        let formError = false;
        let newFormValues = { ...formValues };
        const data = new FormData(event.currentTarget);
        const name = (data.get('name')).trim();
        const email = (data.get('email')).trim();
        const password = (data.get('password')).trim();
        const confirmPassword = (data.get('confirmPassword')).trim();
        if (name.length <= 0) {
            newFormValues.name.error = true;
            formError = true;
        } else {
            newFormValues.name.error = false;
        }
        if (!validateEmail(email)) {
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
        if (confirmPassword.length < 6 || confirmPassword != password) {
            newFormValues.confirmPassword.error = true;
            formError = true;
        } else {
            newFormValues.confirmPassword.error = false;
        }
        setFormValues(newFormValues);
        if (!formError) {
            setLoading(true);
            register({
                name: name,
                username: convertToSlug(name),
                email: email,
                password: password
            }).then((res) => {
                notifySuccess(res.data.message);
                navigate('/login');
            }).catch((err) => {
                if (err.data) {
                    notifyError(err.data.message);
                }
            }).finally(() => {
                setLoading(false);
            });
        }
        return;
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
                        <AppRegistrationIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    error={formValues.name.error}
                                    helperText={formValues.name.error && formValues.name.errorMessage}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    error={formValues.email.error}
                                    helperText={formValues.email.error && formValues.email.errorMessage}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    error={formValues.password.error}
                                    helperText={formValues.password.error && formValues.password.errorMessage}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm-password"
                                    error={formValues.confirmPassword.error}
                                    helperText={formValues.confirmPassword.error && formValues.confirmPassword.errorMessage}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to='/login'>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
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