import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { notifyError } from '../notify/index';
import { fetchPost } from '../api/blogpost';

const defaultTheme = createTheme();

export default function Blog() {
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState({});
    let { id } = useParams();

    useEffect(() => {
        document.title = "React Node | Blog";
        setLoading(true);
        fetchPost({ _id: id }).then((res) => {
            console.log(res.data.data);
            setPost(res.data.data);
            document.title = "React Node | Blog - " + res.data.data.title;
        }).catch((err) => {
            if (err.data) {
                notifyError(err.data.message);
            }
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, }}>
                    <Container maxWidth="sm">
                        {
                            loading ?
                            <Stack spacing={1}>
                                <Skeleton variant="rectangular" height={200} />
                                <Skeleton variant="rounded" height={60} />
                                <Skeleton variant="rounded" height={250} />
                            </Stack> : 
                            <>
                                <Box
                                    component="img"
                                    alt="The house from the offer."
                                    src={post.image}
                                />
                                <Typography
                                    component="h1"
                                    variant="h4"
                                    color="text.primary"
                                    gutterBottom
                                >{post.title}</Typography>
                                <Typography variant="p" color="text.secondary" paragraph>{post.contents}</Typography>
                            </>
                        }
                    </Container>
                </Box>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </main>
        </ThemeProvider>
    );
}