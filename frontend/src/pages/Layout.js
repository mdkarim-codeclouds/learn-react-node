import { Outlet, Link, useNavigate } from "react-router-dom"; 
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from '../config/index';
import { isUserLogin, getUserAuthToken, unsetUserData } from '../storage/index';
import { notifySuccess, notifyError } from '../notify/index';
import { logout, checkUserToken } from '../api/auth';

const drawerWidth = 240;
const navItems = isUserLogin() ? Config.LOGGED_USER_MENU_ITEM : Config.MENU_ITEM;
const navItemsLinks = Config.MENU_ITEM_LINK;
const MySwal = withReactContent(Swal);

const Layout = (props) => {

    React.useEffect(() => {
        checkUserToken([]).then((res) => {}).catch((err) => {
            if (err.data) {
                unsetUserData();
            }
        });
    }, []);

    const { layoutWindow } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const navigate = useNavigate();
    const handleClick = (goTo) => {
        navigate(goTo);
    }

    const handleLogout = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You want to logout!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                let token = getUserAuthToken();
                logout({ token: token }).then((res) => {
                    notifySuccess(res.data.message);
                    unsetUserData();
                    if (window.location.pathname == '/') {
                        window.location.reload();
                    } else {
                        window.location = "/";
                    }
                }).catch((err) => {
                    if (err.data) {
                        notifyError(err.data.message);
                    }
                }).finally(() => {
                    setLoading(false);
                });
            }
        });
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                BlogLite
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} onClick={() => handleClick(navItemsLinks[item])} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
    const container = layoutWindow !== undefined ? () => layoutWindow().document.body : undefined;
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            BlogLite
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                item == 'Logout' ? 
                                    <Button key={item} sx={{ color: '#fff', marginRight: '15px' }} onClick={handleLogout}>{item}</Button> :
                                    <Button key={item} sx={{ color: '#fff', marginRight: '15px' }}>
                                        <Link to={navItemsLinks[item]} style={{ color: '#fff', textDecoration: 'none' }}>{item}</Link>
                                    </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box component="main" sx={{ p: 4 }}></Box>
            </Box>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Container fixed>
                <Outlet />
            </Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
};

Layout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    layoutWindow: PropTypes.func,
};

export default Layout;