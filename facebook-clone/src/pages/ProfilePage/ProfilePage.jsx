import React, { useState, useEffect } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import Header from "../../components/header/Header";
import Post from "../../components/post/Post";
import "./ProfilePage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { storage } from "../../firebase";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet";
import NewPost from "../../components/NewPost/NewPost";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const [responseUser, responsePosts] = await Promise.all([
        axios.get(`http://localhost:8000/users/${id}`),
        axios.get(`http://localhost:8000/posts?_sort=id&_order=desc`),
      ]);
      setUser(responseUser.data);
      setPosts(responsePosts.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrlBg, setImageUrlBg] = useState(null);
  const [imageUrlAvatar, setImageUrlAvartar] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const handleClose = () => {
    setSelectedImageUrl(null);
    setShow(false);
  };
  const handleShow = (type) => {
    setEditImage(type);
    setShow(true);
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setSelectedImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleImageUpload = () => {
    if (!selectedImage) return;

    const storageRef = ref(storage, `images/${selectedImage.name}`);
    uploadBytes(storageRef, selectedImage)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((url) => {
        axios
          .patch(`http://localhost:8000/users/${id}`, { [editImage]: url })
          .then((response) => {
            console.log(`User ${editImage} updated:`, response.data);
            editImage === "bgImage"
              ? setImageUrlBg(url)
              : setImageUrlAvartar(url);
            setSelectedImageUrl(null);
            handleClose();
          })
          .catch((error) => {
            console.error(`Error updating user ${editImage}:`, error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  return (
    <div>
      <Helmet>
        <title>{!!user ? `${user.lastName} ${user.firstName}` : ""}</title>
      </Helmet>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control type="file" onChange={handleImageChange} />

            {selectedImageUrl && (
              <img
                src={selectedImageUrl}
                alt=""
                className="w-100 object-fit-cover rounded-bottom mt-3"
                height={"350px"}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleImageUpload}>
              Sửa
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Header />
      <Container className="mt-5">
        <div className="w-100 profile-bg-box position-relative">
          <img
            src={
              imageUrlBg ||
              user?.bgImage ||
              "https://e0.pxfuel.com/wallpapers/91/989/desktop-wallpaper-background-for-facebook-cover-5-z.jpg"
            }
            alt=""
            className="w-100 object-fit-cover rounded-bottom mt-3"
            height={"350px"}
          />
          <Button
            variant="light"
            className="profile-btn-edit-bg position-absolute "
            onClick={() => handleShow("bgImage")}
          >
            Sửa ảnh bìa
          </Button>
        </div>

        <div className="d-flex w-100 mt-3">
          <div className=" d-flex  align-items-center w-50 gap-4 ">
            <div className="position-relative">
              <Image
                src={
                  imageUrlAvatar ||
                  user?.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/2815/2815428.png"
                }
                roundedCircle
                width={"150px"}
                height={"150px"}
                className="object-fit-cover"
              />
              <Button
                variant="primary"
                className="rounded-circle profile-btn-edit-avatar position-absolute"
                onClick={() => handleShow("avatar")}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </Button>
            </div>
            <div>
              <h2 className="text-wrap">
                {user?.lastName} {user?.firstName}
              </h2>
              <p>{user?.friends.length} bạn bè</p>
            </div>
          </div>
        </div>
        <div className="border-top mt-3 d-flex gap-2 py-1">
          <div className="p-3 btn btn-light">Bài viết</div>
          <div className="p-3 btn btn-light">Giới thiệu</div>
          <div className="p-3 btn btn-light">Bạn bè</div>
        </div>
      </Container>
      <div className="profile-main shadow-sm pb-3">
        <Container>
          <Row>
            <Col sm={5}>
              <div className="mt-3">
                <div className="p-3 shadow-sm border rounded d-flex gap-2 flex-column bg-white">
                  <h3>Giới thiệu</h3>
                  <p>
                    Ngày sinh:{" "}
                    {`${user?.date} - ${user?.month} - ${user?.year}`}
                  </p>
                  <button className="btn btn-secondary w-100">
                    Thêm tiểu sử
                  </button>
                  <button className="btn btn-secondary w-100">
                    Chỉnh sử chi tiết
                  </button>
                  <button className="btn btn-secondary w-100">
                    Thêm sở thích
                  </button>
                  <button className="btn btn-secondary w-100">
                    Thêm nội dung đáng chú ý
                  </button>
                </div>
                <div className="p-3 shadow-sm border rounded bg-white">
                  <h3>Bạn bè</h3>
                  <p>{user?.friends.length} bạn</p>
                </div>
              </div>
            </Col>
            <Col sm={7}>
              {user ? <NewPost findUser={user} fetchData={fetchData} /> : <></>}

              <h2 className="mt-3 bg-white p-3 rounded">Bài viết</h2>
              {/* {posts?.length === 0 ? (
                posts.map((e) => {
                  if (e.userId === 0) {
                    return <Post key={e.id} postId={e.id} />;
                  }
                })
              ) : (
                <h2 className="bg-white p-3 rounded">Không có bài viết</h2>
              )} */}
              {posts?.map((e, i) => {
                if (e.userId === +id) {
                  return <Post key={e.id} postId={e.id} />;
                } else {
                  return (
                    // <h2 className="bg-white p-3 rounded">Không có bài viết</h2>
                    <div key={e.id}></div>
                  );
                }
              })}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
