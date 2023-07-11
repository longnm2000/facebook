import React, { useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Post(props) {
  const navigate = useNavigate();
  const decodedToken = jwt_decode(localStorage.getItem("currentUser"));
  const [isDelete, setIsDelete] = useState(false);
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);
  const fetchData = async () => {
    try {
      const [responseUser, responsePosts] = await Promise.all([
        axios.get(`http://localhost:8000/users/`),
        axios.get(`http://localhost:8000/posts/`),
      ]);
      setUsers(responseUser.data);
      setPosts(responsePosts.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const findPost = posts?.find((post) => post.id === +props.postId);

  const findUser = users?.find((user) => user.id === findPost?.userId);

  const findLike = findPost?.like.indexOf(+decodedToken?.sub);

  const handleLikePost = async () => {
    if (findLike >= 0) {
      findPost.like.splice(findLike, 1);
    } else {
      findPost.like.push(+decodedToken?.sub);
    }
    await axios
      .patch(`http://localhost:8000/posts/${findPost.id}`, {
        like: findPost.like,
      })
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isAuth = posts?.some(
    (e) => e.userId === +decodedToken.sub && props.postId === e.id
  );

  const handleDeletePost = async () => {
    if (isAuth) {
      await axios.delete(`http://localhost:8000/posts/${props.postId}`);
      setIsDelete(true);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newComment, setNewComment] = useState("");

  const handleAddNewComment = async () => {
    let objComment = { userId: +decodedToken.sub, comment: newComment };
    console.log(objComment);
    findPost?.comments.unshift(objComment);
    console.log(findPost);
    await axios
      .patch(`http://localhost:8000/posts/${findPost.id}`, {
        comments: findPost.comments,
      })
      .then((response) => {
        console.log(response.data);
        setNewComment("");
        handleClose();
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Viết bình luận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddNewComment}>
            Gửi bình luận
          </Button>
        </Modal.Footer>
      </Modal>
      {!isDelete ? (
        <div className="bg-white p-3 mt-3  rounded ">
          <div className="d-flex align-items-center justify-content-between ">
            <div className="d-flex align-items-center gap-2">
              <div className="post-icon-box-2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJ6-GDx2BZEukcar1X9eCqbSjD0EJaV4e4g&usqp=CAU"
                  alt=""
                  className="rounded-5"
                />
              </div>
              <div>
                <NavLink
                  className="route-navlink post-route-navlink"
                  to={`/profile/${findPost?.userId}`}
                >
                  <h5>
                    {findUser?.lastName} {findUser?.firstName}
                  </h5>
                </NavLink>

                <div>
                  <i className="fa-solid fa-earth-americas"></i>
                </div>
              </div>
            </div>
            <Dropdown>
              <Dropdown.Toggle variant="white" id="dropdown-basic">
                <i className="fa-solid fa-ellipsis"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDeletePost}>
                  Xóa bài
                </Dropdown.Item>
                <Dropdown.Item>Lưu bài</Dropdown.Item>
                <Dropdown.Item>Dịch</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="mt-2">
            <p>{findPost?.content}</p>
            <img
              src={findPost?.image}
              alt=""
              className="w-100 border border-start-0 border-end-0"
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex align-items-center gap-2">
              <img
                src="https://img.uxwing.com/wp-content/themes/uxwing/download/hand-gestures/blue-like-button-icon.png"
                alt=""
                width={"20px"}
              />
              <span>{findPost?.like.length}</span>
            </div>
            <div>
              <span>{findPost?.comments.length} </span>
              <i className="fa-regular fa-message"></i>
            </div>
          </div>
          <div className="d-flex justify-content-between border-top mt-3 pt-2">
            <button
              className="btn btn-light flex-grow-1"
              onClick={handleLikePost}
            >
              {findLike >= 0 ? (
                <span>
                  <i
                    className="fa-solid fa-thumbs-up"
                    style={{ color: "#2a70ea" }}
                  ></i>{" "}
                  Đã thích
                </span>
              ) : (
                <span>
                  <i className="fa-regular fa-thumbs-up"></i> Thích
                </span>
              )}
            </button>
            <button className="btn btn-light flex-grow-1" onClick={handleShow}>
              <i className="fa-regular fa-message"></i> Bình luận
            </button>
            <button className="btn btn-light flex-grow-1">
              <i className="fa-solid fa-share"></i> Chia sẻ
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
