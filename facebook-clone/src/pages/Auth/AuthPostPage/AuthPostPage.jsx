import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems } from "../../../components/ListItems/listItems";
import FacebookIcon from "@mui/icons-material/Facebook";
// import Chart from './Chart';
import Deposits from "../../../components/Deposits/Deposits";
import Orders from "../../../components/Orders/Orders";
import { useNavigate } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../../components/Title/Title";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Avatar from "@mui/material/Avatar";
import { Helmet } from "react-helmet";
import TablePagination from "@mui/material/TablePagination";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AuthPostPage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleExit = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login-admin");
  };

  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState(null);
  const [postCommentsCount, setPostCommentsCount] = useState({});

  const fetchData = async () => {
    try {
      const [responseUser, responsePosts, responseComments] = await Promise.all(
        [
          axios.get(`http://localhost:8000/users/`),
          axios.get(`http://localhost:8000/posts?_sort=id&_order=desc`),
          axios.get("http://localhost:8000/comments"),
        ]
      );
      setUsers(responseUser.data);
      setPosts(responsePosts.data);
      setComments(responseComments.data);
      const commentsCount = responseComments.data.reduce((count, comment) => {
        if (count[comment.postId]) {
          count[comment.postId]++;
        } else {
          count[comment.postId] = 1;
        }
        return count;
      }, {});
      setPostCommentsCount(commentsCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedPost, setSelectedPost] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const handlePostDetail = async (post) => {
    setSelectedPost(post);
    handleShow();

    try {
      const response = await axios.get(
        `http://localhost:8000/comments?postId=${post.id}`
      );
      setPostComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (postId) => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8000/posts/${postId}`);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Pagination change event handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Helmet>
        <title>Posts</title>
      </Helmet>
      <>
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="mt-5 pb-3"
        >
          <Modal.Header closeButton>
            <Modal.Title>Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPost && (
              <>
                <Typography variant="h6">Post Detail</Typography>
                <Typography>ID: {selectedPost.id}</Typography>
                <Typography>User ID: {selectedPost.userId}</Typography>
                <Typography>Content: {selectedPost.content}</Typography>
                <img src={selectedPost.image} alt="" className="w-100" />
                <Typography>Like Count: {selectedPost.like.length}</Typography>

                <Typography variant="h6">Comments</Typography>
                {postComments.map((comment, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", my: 2 }}
                  >
                    <Avatar
                      src={
                        users.find((user) => user.id === comment.userId)?.avatar
                      }
                      alt="Avatar"
                      sx={{ mr: 2 }}
                    />
                    <div>
                      <b>
                        <Typography variant="body">
                          {
                            users.find((user) => user.id === comment.userId)
                              ?.firstName
                          }{" "}
                          {
                            users.find((user) => user.id === comment.userId)
                              ?.lastName
                          }
                        </Typography>
                      </b>
                      <Typography variant="body1">{comment.comment}</Typography>
                    </div>
                  </Box>
                ))}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <FacebookIcon />
            </Typography>
            <DropdownButton
              id="dropdown-basic-button"
              title="ADMIN"
              variant="info"
            >
              <Dropdown.Item onClick={handleExit}>Logout</Dropdown.Item>
            </DropdownButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  className="overflow-x-auto bg-white"
                >
                  <React.Fragment>
                    <Title>Posts</Title>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell>User Id</TableCell>
                          <TableCell>Image</TableCell>
                          <TableCell>Like</TableCell>
                          <TableCell>Comment</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {posts
                          ?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((post, index) => (
                            <TableRow key={index}>
                              <TableCell>{post.id}</TableCell>
                              <TableCell>{post.userId}</TableCell>
                              <TableCell>
                                <img src={post.image} alt="" width={"50px"} />
                              </TableCell>
                              <TableCell>{post.like.length}</TableCell>
                              <TableCell>
                                {postCommentsCount[post.id] || 0}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="primary"
                                  onClick={() => handlePostDetail(post)}
                                  className="me-2"
                                >
                                  Detail
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() => deletePost(post.id)}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={posts?.length || 0}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </React.Fragment>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
