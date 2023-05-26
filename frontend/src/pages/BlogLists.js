import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { notifyError, notifySuccess } from '../notify/index';
import { isUserLogin, unsetUserData } from '../storage/index';
import { all, remove } from '../api/blogpost';

const MySwal = withReactContent(Swal);
function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => {
    return {
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#1976d2',
            color: '#fff',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function BlogLists() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [blogs, setBlogs] = React.useState([]);
    const getBlogPosts = () => {
        setLoading(true);
        all({ search: '' }).then((res) => {
            setBlogs(res.data.data);
        }).catch((err) => {
            if (err.data) {
                notifyError(err.data.message);
            }
        }).finally(() => {
            setLoading(false);
        });
    };
    React.useEffect(() => {
        if (!isUserLogin()) {
            navigate('/login');
        } else {
            document.title = "React Node | Blog Lists";
            getBlogPosts();
        }
    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleBlogPostDelete = (_id) => {
        console.log(_id);
        MySwal.fire({
            title: 'Are you sure?',
            text: "You want to delete!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                remove({ _id: _id }).then((res) => {
                    setLoading(false);
                    notifySuccess(res.data.message);
                    getBlogPosts();
                }).catch((err) => {
                    setLoading(false);
                    if (err.data) {
                        notifyError(err.data.message);
                        if (err.data.message == 'Unauthorized!') {
                            unsetUserData();
                            window.location = '/login';
                        }
                    }
                });
            }
        });
    };

    return (
        <TableContainer component={Paper} sx={{ marginTop: 10 }}>
            <Table sx={{ minWidth: 700 }} aria-label="Blog Lists">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h4" gutterBottom>
                                Blog Lists
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell>
                            <Typography variant="h6" gutterBottom sx={{ marginBottom: 0 }}>
                                Title
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="h6" gutterBottom sx={{ marginBottom: 0 }}>
                                Details
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="h6" gutterBottom sx={{ marginBottom: 0 }}>
                                Image
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="h6" gutterBottom sx={{ marginBottom: 0 }}>
                                Publish On
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography variant="h6" gutterBottom sx={{ marginBottom: 0 }}>
                                Action
                            </Typography>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {blogs.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row">{row.title}</StyledTableCell>
                            <StyledTableCell>{row.details}</StyledTableCell>
                            <StyledTableCell>
                                <Box
                                    component="img"
                                    sx={{
                                        width: 60,
                                    }}
                                    src={row.image}
                                />
                            </StyledTableCell>
                            <StyledTableCell>{row.publish_on}</StyledTableCell>
                            <StyledTableCell>
                                <Button variant="contained">
                                    <Link to={'/bloglist/edit/' + row._id} style={{ textDecoration: 'none', color: '#fff' }}>Edit</Link>
                                </Button>
                                <Button variant="contained" color="error" sx={{ marginLeft: '13px' }} onClick={() => handleBlogPostDelete(row._id)}>
                                    Delete
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={6}
                            count={blogs.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </TableContainer>
    );
}