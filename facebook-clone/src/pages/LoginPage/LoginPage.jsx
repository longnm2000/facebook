import React from "react";
import "./LoginPage.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { useState } from "react";
import Register from "../../components/register/Register";

function LoginPage() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();

    // Validate input
    if (!email || !password) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    axios
      .post("http://localhost:8000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem(
            "currentUser",
            JSON.stringify(res.data.accessToken)
          );

          navigate("/");
          toast.success("Đăng nhập thành công");
        }
      })

      .catch((err) => {
        if (err.response && err.response.status === 404) {
          toast.error("Đăng nhập thất bại");
        } else {
          toast.error("Đã xảy ra lỗi");
        }
      });
  };

  return (
    <div>
      <div className="main-box">
        <Container className="py-4">
          <Row className="align-items-center" style={{ minHeight: "500px" }}>
            <Col lg={7}>
              <img src="/fb_logo_1.svg" alt="" className="logo-img" />
              <h2 className="mt-3">
                Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc
                sống của bạn.
              </h2>
            </Col>
            <Col lg={5}>
              <Form
                onSubmit={handleLogin}
                className="py-5 bg-white p-3 rounded-3"
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    className="py-2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    className="py-2"
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 py-2">
                  Đăng nhập
                </Button>
                <a href="www.google.com">Quên mật khẩu</a>
                <hr />
                <div className="d-flex justify-content-center">
                  <Button
                    className="p-2 px-3"
                    variant="success"
                    onClick={handleShow}
                  >
                    Tạo tài khoản mới
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Container>
          <ul className="custom-list d-flex  flex-wrap mt-4 gap-1 justify-content-between">
            <li>Tiếng Việt</li>
            <li>English (UK)</li>
            <li>中文(台灣)</li>
            <li>한국어</li>
            <li>日本語</li>
            <li>Français (France)</li>
            <li>ภาษาไทย</li>
            <li>Español</li>
            <li>Português (Brasil)</li>
            <li>Deutsch</li>
            <li>Italiano</li>
            <li>
              <button className="border-1 border-secondary-subtle">+</button>
            </li>
          </ul>
          <hr />
          <ul className="custom-list d-flex gap-3 flex-wrap mt-3">
            <li>
              <a href="/reg/" title="Đăng ký Facebook">
                Đăng ký
              </a>
            </li>
            <li>
              <a href="/login/" title="Đăng nhập Facebook">
                Đăng nhập
              </a>
            </li>
            <li>
              <a href="https://messenger.com/" title="Xem Messenger.">
                Messenger
              </a>
            </li>
            <li>
              <a href="/lite/" title="Facebook Lite dành cho Android.">
                Facebook Lite
              </a>
            </li>
            <li>
              <a
                href="https://vi-vn.facebook.com/watch/"
                title="Lướt xem video của chúng tôi trên tab Watch."
              >
                Watch
              </a>
            </li>
            <li>
              <a
                href="/places/"
                title="Xem những địa điểm nổi tiếng trên Facebook."
              >
                Địa điểm
              </a>
            </li>
            <li>
              <a href="/games/" title="Xem trò chơi trên Facebook.">
                Trò chơi
              </a>
            </li>
            <li>
              <a
                href="/marketplace/"
                title="Mua bán trên Facebook Marketplace."
              >
                Marketplace
              </a>
            </li>
            <li>
              <a
                href="https://pay.facebook.com/"
                title="Tìm hiểu thêm về Meta Pay"
              >
                Meta Pay
              </a>
            </li>
            <li>
              <a href="https://www.meta.com/" title="Thanh toán qua Meta">
                Cửa hàng trên Meta
              </a>
            </li>
            <li>
              <a
                href="https://www.meta.com/quest/"
                title="Tìm hiểu thêm về Meta Quest"
              >
                Meta Quest
              </a>
            </li>
            <li>
              <a
                href="https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2F&amp;h=AT0xOJVaQu8HxLqS5zXcgOqB0yLK517ztTZskrbBgDfqw5IqQXZOS0-WOabG9QmJqIJsAc9UcThM76McpOQ6JJBaGSc1Yv7ILIw9muetaDbbUmIYWdrAldVbJ8WhDiKiE3QsrluVPFiEvw"
                title="Hãy xem Instagram"
                target="_blank"
                rel="noreferrer nofollow"
                data-lynx-mode="asynclazy"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="/fundraisers/"
                title="Quyên góp cho các mục đích có ý nghĩa."
              >
                Chiến dịch gây quỹ
              </a>
            </li>
            <li>
              <a
                href="/biz/directory/"
                title="Lướt xem thư mục Dịch vụ Facebook của chúng tôi."
              >
                Dịch vụ
              </a>
            </li>
            <li>
              <a
                href="/votinginformationcenter/?entry_point=c2l0ZQ%3D%3D"
                title="Xem Trung tâm thông tin bỏ phiếu."
              >
                Trung tâm thông tin bỏ phiếu
              </a>
            </li>
            <li>
              <a
                href="/privacy/policy/?entry_point=facebook_page_footer"
                title="Tìm hiểu cách chúng tôi thu thập, sử dụng và chia sẻ thông tin để hỗ trợ Facebook."
              >
                Chính sách quyền riêng tư
              </a>
            </li>
            <li>
              <a
                href="/privacy/center/?entry_point=facebook_page_footer"
                title="Tìm hiểu cách quản lý và kiểm soát quyền riêng tư trên Facebook."
              >
                Trung tâm quyền riêng tư
              </a>
            </li>
            <li>
              <a href="/groups/discover/" title="Khám phá nhóm.">
                Nhóm
              </a>
            </li>
            <li>
              <a
                href="https://about.meta.com/"
                title="Đọc blog của chúng tôi, khám phá trung tâm tài nguyên và tìm cơ hội việc làm."
              >
                Giới thiệu
              </a>
            </li>
            <li>
              <a
                href="/ad_campaign/landing.php?placement=pflo&amp;campaign_id=402047449186&amp;nav_source=unknown&amp;extra_1=auto"
                title="Quảng cáo trên Facebook."
              >
                Tạo quảng cáo
              </a>
            </li>
            <li>
              <a href="/pages/create/?ref_type=site_footer" title="Tạo Trang">
                Tạo Trang
              </a>
            </li>
            <li>
              <a
                href="https://developers.facebook.com/?ref=pf"
                title="Phát triển trên nền tảng của chúng tôi."
              >
                Nhà phát triển
              </a>
            </li>
            <li>
              <a
                href="/careers/?ref=pf"
                title="Tạo bước ngoặt mới trong sự nghiệp của bạn với công ty tuyệt vời của chúng tôi"
              >
                Tuyển dụng
              </a>
            </li>
            <li>
              <a
                href="/policies/cookies/"
                title="Tìm hiểu về cookie và Facebook."
                data-nocookies="1"
              >
                Cookie
              </a>
            </li>
            <li>
              <a
                className="_41ug"
                data-nocookies="1"
                href="https://www.facebook.com/help/568137493302217"
                title="Tìm hiểu về Lựa chọn quảng cáo."
              >
                Lựa chọn quảng cáo
                <i className="img sp_EP9wX8qDDvu sx_6bdd81"></i>
              </a>
            </li>
            <li>
              <a
                data-nocookies="1"
                href="/policies?ref=pf"
                title="Xem lại điều khoản và chính sách của chúng tôi."
              >
                Điều khoản
              </a>
            </li>
            <li>
              <a
                href="/help/?ref=pf"
                title="Truy cập Trung tâm trợ giúp của chúng tôi."
              >
                Trợ giúp
              </a>
            </li>
            <li>
              <a
                href="help/637205020878504"
                title="Xem Thông báo Tải thông tin liên hệ lên &amp; đối tượng không phải người dùng."
              >
                Tải thông tin liên hệ lên &amp; đối tượng không phải người dùng
              </a>
            </li>
            <li>
              <a
                className="accessible_elem"
                href="/settings"
                title="Xem và chỉnh sửa cài đặt Facebook."
              >
                Cài đặt
              </a>
            </li>
            <li>
              <a
                className="accessible_elem"
                href="/allactivity?privacy_source=activity_log_top_menu"
                title="Xem nhật ký hoạt động"
              >
                Nhật ký hoạt động
              </a>
            </li>
          </ul>
          <div className="mb-4">Meta © 2023</div>
        </Container>
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Đăng ký</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Register />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default LoginPage;
