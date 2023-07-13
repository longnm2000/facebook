import React, { useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Post(props) {
  const decodedToken = jwt_decode(localStorage.getItem("currentUser"));
  const [isDelete, setIsDelete] = useState(false);
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);
  const [commentsList, setCommentsList] = useState(null);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editComment, setEditComment] = useState("");

  const fetchData = async () => {
    try {
      const [responseUser, responsePosts, responseComments] = await Promise.all(
        [
          axios.get(`http://localhost:8000/users/`),
          axios.get(`http://localhost:8000/posts/`),
          axios.get(`http://localhost:8000/comments/`),
        ]
      );
      setUsers(responseUser.data);
      setPosts(responsePosts.data);
      setCommentsList(responseComments.data);
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

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [newComment, setNewComment] = useState("");

  const handleAddNewComment = async () => {
    let objComment = {
      postId: props.postId,
      userId: +decodedToken.sub,
      comment: newComment,
    };
    console.log(objComment);
    setCommentsList([...commentsList, objComment]);
    console.log(commentsList);

    await axios
      .post(`http://localhost:8000/comments/`, {
        postId: props.postId,
        userId: +decodedToken.sub,
        comment: newComment,
      })
      .then((response) => {
        console.log(response.data);
        setNewComment("");
        handleClose1();
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const postComments = commentsList?.filter((e) => e.postId === props.postId);

  const handleDeleteComment = async (user, id) => {
    if (user === +decodedToken.sub) {
      await axios.delete(`http://localhost:8000/comments/${id}`);
      fetchData();
    }
  };

  const handleEditComment = async () => {
    if (editCommentId && editComment) {
      await axios
        .patch(`http://localhost:8000/comments/${editCommentId}`, {
          comment: editComment,
        })
        .then((response) => {
          console.log(response.data);
          fetchData();
          handleClose2();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const [editMode, setEditMode] = useState(false);

  const handleShow2 = (updateComment) => {
    if (updateComment.userId === +decodedToken.sub) {
      setEditCommentId(updateComment.id);
      const comment = commentsList.find(
        (comment) => comment.id === updateComment.id
      );
      setEditComment(comment?.comment);
      setEditMode(true);
    }
  };

  const handleClose2 = () => {
    setEditMode(false);
    setEditCommentId(null);
    setEditComment("");
  };

  return (
    <>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Viết bình luận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
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
                  src={findUser?.avatar}
                  alt=""
                  className="rounded-5 object-fit-cover"
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
              <span>{postComments?.length} </span>
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
            <button className="btn btn-light flex-grow-1" onClick={handleShow1}>
              <i className="fa-regular fa-message"></i> Bình luận
            </button>
            <button className="btn btn-light flex-grow-1">
              <i className="fa-solid fa-share"></i> Chia sẻ
            </button>
          </div>
          <div className="mt-3">
            {postComments?.map((e, i) => {
              const findAuth = users.find((user) => user.id === e.userId);
              return (
                <div className="d-flex gap-2" key={i}>
                  <div>
                    <NavLink
                      className={"post-route-navlink route-navlink"}
                      to={`/profile/${findAuth.id}`}
                    >
                      <img
                        src={findAuth?.avatar}
                        alt=""
                        width={"40px"}
                        height={"40px"}
                        className="rounded-circle"
                      />
                    </NavLink>
                  </div>
                  <div>
                    <h5>
                      <NavLink
                        className={"post-route-navlink route-navlink"}
                        to={`/profile/${findAuth.id}`}
                      >
                        {findAuth.lastName} {findAuth.firstName}
                      </NavLink>
                    </h5>
                    <p>{e.comment}</p>
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle variant="white" id="dropdown-basic">
                      <i className="fa-solid fa-ellipsis"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleShow2(e)}>
                        Sửa comment
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleDeleteComment(findAuth.id, e.id)}
                      >
                        Xóa comment
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Modal show={editMode} onHide={handleClose2}>
                    <Modal.Header closeButton>
                      <Modal.Title>Sửa bình luận</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Control
                        type="text"
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose2}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleEditComment}>
                        Gửi bình luận
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
