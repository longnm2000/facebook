import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/header/Header";
import { Col, Container, Row } from "react-bootstrap";
import "./HomePage.css";
import Post from "../../components/post/Post";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Helmet } from "react-helmet";
import NewPost from "../../components/NewPost/NewPost";

function HomePage() {
  const decodedToken = jwt_decode(localStorage.getItem("currentUser"));
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);
  const fetchData = async () => {
    try {
      const [responseUser, responsePosts] = await Promise.all([
        axios.get(`http://localhost:8000/users/`),
        axios.get(`http://localhost:8000/posts?_sort=id&_order=desc`),
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

  const findUser = useMemo(() => {
    if (users?.length > 0) {
      return users.find((e) => e.id === +decodedToken.sub);
    }
    return null;
  }, [users, decodedToken]);

  return (
    <div>
      <Helmet>
        <title>Facebook</title>
      </Helmet>
      <Header findUser={findUser} />
      <Container fluid className="home-main">
        <Row>
          <Col xl={3} className="h-100">
            <div className=" home-left-nav">
              <NavLink
                to={!!findUser ? `/profile/${findUser.id}` : "/login-user"}
                className={"route-navlink"}
              >
                <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                  <div className="home-icon-box d-flex justify-content-center align-items-center">
                    <img
                      src={!!findUser ? findUser?.avatar : ""}
                      alt=""
                      className="rounded-5 object-fit-cover"
                    />
                  </div>
                  <div>
                    {!!findUser
                      ? `${findUser.lastName} ${findUser.firstName}`
                      : ""}
                  </div>
                </div>
              </NavLink>

              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-user-group"></i>
                </div>
                <div>Tìm bạn bè</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yb/r/eECk3ceTaHJ.png"
                    alt=""
                  />
                </div>
                <div>Bảng feed</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-people-group"></i>
                </div>
                <div>Nhóm</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-shop"></i>
                </div>
                <div>Marketplace</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-tv"></i>
                </div>
                <div>Watch</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-money-check-dollar"></i>
                </div>
                <div>Chiến dịch gây quỹ</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-gamepad"></i>
                </div>
                <div>Chơi game</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-bookmark"></i>
                </div>
                <div>Đã lưu</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/GJ4EaivDaSj.png"
                    alt=""
                  />
                </div>
                <div>Đơn đặt hàng và thanh toán</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/x2_LFd7gCqg.png"
                    alt=""
                  />
                </div>
                <div>Hoạt động quảng cáo gần đây</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-clock-rotate-left"></i>
                </div>
                <div>Kỷ niệm</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <i className="fa-brands fa-facebook-messenger"></i>
                </div>
                <div>Messenger</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/6Z9DShdc7zU.png"
                    alt=""
                  />
                </div>
                <div>Messenger nhí</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <i className="fa-solid fa-calendar-days"></i>
                </div>
                <div>Sự kiện</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/ATlxuj_J5ty.png"
                    alt=""
                  />
                </div>
                <div>Trình quản lý quảng cáo</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/Jr0q8qKF2-Y.png"
                    alt=""
                  />
                </div>
                <div>Trung tâm khoa học khí hậu</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/CwKNCefmHON.png"
                    alt=""
                  />
                </div>
                <div>Trung tâm quảng cáo</div>
              </div>
              <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
                <div className="home-icon-box d-flex justify-content-center align-items-center">
                  <img
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/fNPcDZC-2PD.png"
                    alt=""
                  />
                </div>
                <div>Ứng phó khẩn cấp</div>
              </div>
            </div>
          </Col>
          <Col xl={6} className="pb-3">
            {!!findUser ? (
              <NewPost findUser={findUser} fetchData={fetchData} />
            ) : (
              <></>
            )}
            {posts?.map((e, i) => (
              <Post key={e.id} postId={e.id} />
            ))}
          </Col>
          <Col xl={3}>
            <div className="d-flex align-items-center home-group-icon gap-2 rounded px-2">
              <div className="home-icon-box d-flex justify-content-center align-items-center">
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                  className="rounded-5"
                />
              </div>
              <div>Nguyễn Mạnh Long</div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
