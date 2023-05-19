import * as React from 'react';
import { useState } from "react";
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

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                CCMD
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Contact() {
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
        query: {
            value: '',
            error: false,
            errorMessage: 'Please enter your query'
        }
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        let formError = false;
        let newFormValues = { ...formValues };
        const data = new FormData(event.currentTarget);
        const name = (data.get('name')).trim();
        const email = (data.get('email')).trim();
        const query = (data.get('query')).trim();
        if (name.length <= 0) {
            newFormValues.name.error = true;
            formError = true;
        } else {
            newFormValues.name.error = false;
        }
        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            newFormValues.email.error = true;
            formError = true;
        } else {
            newFormValues.email.error = false;
        }
        if (query == '') {
            newFormValues.query.error = true;
            formError = true;
        } else {
            newFormValues.query.error = false;
        }
        setFormValues(newFormValues);
        if (!formError) {
            console.log(email, query);
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
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar> */}
                    <Typography component="h1" variant="h5">
                        Contact Us
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            autoComplete="given-name"
                            name="name"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                            error={formValues.name.error}
                            helperText={formValues.name.error && formValues.name.errorMessage}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            error={formValues.email.error}
                            helperText={formValues.email.error && formValues.email.errorMessage}
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Query"
                            name="query"
                            rows={7}
                            required
                            fullWidth
                            multiline
                            error={formValues.query.error}
                            helperText={formValues.query.error && formValues.query.errorMessage}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    );
}