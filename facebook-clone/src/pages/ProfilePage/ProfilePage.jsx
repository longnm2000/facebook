import React, { useState, useEffect } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import Header from "../../components/header/Header";
import Post from "../../components/post/Post";
import "./ProfilePage.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  const fetchData = async () => {
    try {
      const [responseUser, responsePosts] = await Promise.all([
        axios.get(`http://localhost:8000/users/${id}`),
        axios.get(`http://localhost:8000/posts`),
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

  console.log(user, posts);
  return (
    <div>
      <Header />
      <Container className="mt-5">
        <img
          src={user?.bgImage}
          alt=""
          className="w-100 object-fit-cover rounded-bottom mt-3"
          height={"350px"}
        />
        <div className="d-flex w-100 mt-3">
          <div className=" d-flex  align-items-center w-50 gap-2">
            <Image
              src={user?.avatar}
              roundedCircle
              width={"150px"}
              height={"150px"}
              className="object-fit-cover"
            />
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
                  <p>50 bạn</p>
                </div>
              </div>
            </Col>
            <Col sm={7}>
              <h2 className="mt-3 bg-white p-3 rounded">Bài viết</h2>
              {posts?.map((e, i) => {
                if (e.userId === id) {
                  <Post key={i} postId={e.id} />;
                }
              })}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
