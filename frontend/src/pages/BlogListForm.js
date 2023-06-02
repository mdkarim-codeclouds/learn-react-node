import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { isUserLogin } from '../storage/index';
import { notifySuccess, notifyError } from '../notify/index';
import { checkForImage } from '../util/index';
import { fetchPost, update, create } from '../api/blogpost';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function BlogListForm(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({
        title: '',
        details: '',
        image: '',
        contents: '',
        status: '',
        publish_on: '',
    });
    let { id } = useParams();
    useEffect(() => {
        if (!isUserLogin()) {
            navigate('/login');
        } else {
            if (props.type == 'new') {
                document.title = "React Node | Blog New";
            } else {
                document.title = "React Node | Blog Edit";
                setLoading(true);
                fetchPost({ _id: id }).then((res) => {
                    setPost(res.data.data);
                    document.title = "React Node | Blog Edit - " + res.data.data.title;
                }).catch((err) => {
                    if (err.data) {
                        notifyError(err.data.message);
                    }
                }).finally(() => {
                    setLoading(false);
                });
            }
        }
    }, []);
    const [formValues, setFormValues] = useState({
        title: {
            value: '',
            error: false,
            errorMessage: 'Please enter your title'
        },
        details: {
            value: '',
            error: false,
            errorMessage: 'Please enter your details'
        },
        image: {
            value: '',
            error: false,
            errorMessage: 'Please enter your image'
        },
        contents: {
            value: '',
            error: false,
            errorMessage: 'Please enter your contents'
        },
        status: {
            value: '',
            error: false,
            errorMessage: 'Please select your status'
        },
        publish_on: {
            value: '',
            error: false,
            errorMessage: 'Please select publish on date time'
        }
    });
    const handleChangeFormData = (event, key) => {
        let new_post = { ...post };
        new_post[key] = event.target.value;
        setPost(new_post);
        let newFormValues = { ...formValues };
        newFormValues[key].error = false;
        setFormValues(newFormValues);
    };
    const handleChangePublishOn = (date) => {
        let new_post = { ...post };
        new_post.publish_on = date.format();
        setPost(new_post);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        let formError = false;
        let newFormValues = { ...formValues };
        const data = { ...post };
        let post_data = {
            title: (data.title).trim(),
            details: (data.details).trim(),
            image: (data.image).trim(),
            contents: (data.contents).trim(),
            status: (data.status).trim(),
            publish_on: (data.publish_on).trim(),
        };
        if (post_data.title.length <= 0) {
            newFormValues.title.error = true;
            formError = true;
        } else {
            newFormValues.title.error = false;
        }
        if (post_data.details.length <= 0) {
            newFormValues.details.error = true;
            formError = true;
        } else {
            newFormValues.details.error = false;
        }
        if (!checkForImage(post_data.image)) {
            newFormValues.image.error = true;
            formError = true;
        } else {
            newFormValues.image.error = false;
        }
        if (post_data.contents.length <= 0) {
            newFormValues.contents.error = true;
            formError = true;
        } else {
            newFormValues.contents.error = false;
        }
        if (post_data.status.length <= 0) {
            newFormValues.status.error = true;
            formError = true;
        } else {
            newFormValues.status.error = false;
        }
        if (post_data.publish_on.length <= 0) {
            newFormValues.publish_on.error = true;
            formError = true;
        } else {
            newFormValues.publish_on.error = false;
        }
        setFormValues(newFormValues);
        if (!formError) {
            setLoading(true);
            if (props.type == 'edit') {
                post_data._id = id;
                update(post_data).then((res) => {
                    notifySuccess(res.data.message);
                    navigate('/bloglists');
                }).catch((err) => {
                    if (err.data) {
                        notifyError(err.data.message);
                    }
                }).finally(() => {
                    setLoading(false);
                });
            } else {
                create(post_data).then((res) => {
                    notifySuccess(res.data.message);
                    navigate('/bloglists');
                }).catch((err) => {
                    if (err.data) {
                        notifyError(err.data.message);
                    }
                }).finally(() => {
                    setLoading(false);
                });
            }
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
                        {props.type == 'new' ? 'Blog Post New' : 'Blog Post Edit'}
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    value={post.title}
                                    onChange={(e) => { handleChangeFormData(e, 'title') }}
                                    error={formValues.title.error}
                                    helperText={formValues.title.error && formValues.title.errorMessage}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Details"
                                    name="details"
                                    rows={7}
                                    required
                                    fullWidth
                                    multiline
                                    value={post.details || ''}
                                    onChange={(e) => { handleChangeFormData(e, 'details') }}
                                    error={formValues.details.error}
                                    helperText={formValues.details.error && formValues.details.errorMessage}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="image"
                                    label="Image"
                                    id="image"
                                    value={post.image || ''}
                                    onChange={(e) => { handleChangeFormData(e, 'image') }}
                                    error={formValues.image.error}
                                    helperText={formValues.image.error && formValues.image.errorMessage}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Contents"
                                    name="contents"
                                    rows={9}
                                    required
                                    fullWidth
                                    multiline
                                    value={post.contents || ''}
                                    onChange={(e) => { handleChangeFormData(e, 'contents') }}
                                    error={formValues.contents.error}
                                    helperText={formValues.contents.error && formValues.contents.errorMessage}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={formValues.status.error}>
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={post.status || ''}
                                        label="Status"
                                        onChange={(e) => { handleChangeFormData(e, 'status') }}
                                    >
                                        <MenuItem value='active'>Active</MenuItem>
                                        <MenuItem value='inactive'>In Active</MenuItem>
                                    </Select>
                                    <FormHelperText>{formValues.status.error && formValues.status.errorMessage}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={formValues.publish_on.error}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDateTimePicker
                                            label="Publish On"
                                            value={post.publish_on ? dayjs(post.publish_on) : dayjs()}
                                            onChange={handleChangePublishOn}
                                            name="publish_on"
                                        />
                                    </LocalizationProvider>
                                    <FormHelperText>{formValues.publish_on.error && formValues.publish_on.errorMessage}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
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