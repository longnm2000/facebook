import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear() - 1;
  const startYear = 1905;

  const yearOptions = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }

  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    date: "1",
    month: "1",
    year: "2022",
    gender: "",
    confirmPassword: "",
    avartar: "https://cdn-icons-png.flaticon.com/512/2815/2815428.png",
    bgImage:
      "https://e0.pxfuel.com/wallpapers/91/989/desktop-wallpaper-background-for-facebook-cover-5-z.jpg",
    friends: [],
    isLogin: true,
  });

  const { firstName, lastName, email, password, date, month, year } = register;

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      axios
        .post("http://localhost:8000/register", register)
        .then((res) => {
          localStorage.setItem(
            "currentUser",
            JSON.stringify(res.data.accessToken)
          );
          navigate("/");
          toast.success("Đăng ký thành công");
        })
        .catch((error) => {
          toast.error("Đã xảy ra lỗi hoặc email đã được sử dụng");
        });
    }
    setValidated(true);
  };

  const handleChangeRegister = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    register.confirmPassword = password;
    setRegister({ ...register, [name]: value });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="d-flex gap-2">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Họ"
            className="bg-light"
            required
            value={lastName}
            onChange={handleChangeRegister}
          />
          <Form.Control.Feedback type="invalid">
            Không để trống
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Tên"
            className="bg-light"
            required
            value={firstName}
            onChange={handleChangeRegister}
          />
          <Form.Control.Feedback type="invalid">
            Không để trống
          </Form.Control.Feedback>
        </Form.Group>
      </div>
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          name="email"
          placeholder="Email"
          className="bg-light"
          pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,3}"
          required
          value={email}
          onChange={handleChangeRegister}
        />
        <Form.Control.Feedback type="invalid">
          Email không hợp lệ
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          name="password"
          placeholder="Mật khẩu mới"
          className="bg-light"
          required
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          value={password}
          onChange={handleChangeRegister}
        />
        <Form.Control.Feedback type="invalid">
          Mật khẩu có chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 kí tự
          đặc biệt và có ít nhất 8 kí tự
        </Form.Control.Feedback>
      </Form.Group>
      <p className="note-text m-0 mt-3">Sinh nhật</p>
      <div className="d-flex gap-2">
        <Form.Select
          aria-label="Default select example"
          name="date"
          required
          defaultValue={"1"}
          onChange={handleChangeRegister}
        >
          <option disabled>Ngày</option>
          {Array.from({ length: 31 }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          aria-label="Default select example"
          defaultValue={"1"}
          name="month"
          onChange={handleChangeRegister}
        >
          <option disabled>Tháng</option>
          {Array.from({ length: 12 }, (_, index) => (
            <option key={index} value={index + 1}>
              Tháng {index + 1}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          aria-label="Default select example"
          name="year"
          defaultValue={"2022"}
          onChange={handleChangeRegister}
        >
          <option disabled>Năm</option>
          {yearOptions}
        </Form.Select>
      </div>
      <p className="note-text m-0 mt-3">Giới tính</p>

      <Form.Group className="mb-3 d-flex justify-content-between">
        <Form.Check
          reverse
          inline
          label="Nam"
          type="radio"
          name="gender"
          className="m-0 radio-gender"
          id="male"
          value={0}
          onChange={handleChangeRegister}
          required
        />
        <Form.Check
          reverse
          inline
          label="Nữ"
          type="radio"
          name="gender"
          className="m-0 radio-gender"
          id="female"
          value={1}
          onChange={handleChangeRegister}
          required
        />
        <Form.Check
          reverse
          inline
          label="Không xác định"
          type="radio"
          name="gender"
          className="m-0 radio-gender"
          id="other"
          value={2}
          onChange={handleChangeRegister}
          required
          feedback="Không để trống"
          feedbackType="invalid"
        />
      </Form.Group>

      <p className=" note-text mt-3">
        Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin liên hệ
        của bạn lên Facebook <br />
        Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách quyền
        riêng tư và Chính sách cookie của chúng tôi. Bạn có thể nhận được thông
        báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.
      </p>
      <div className="d-flex justify-content-center">
        <Button variant="primary" type="submit">
          Đăng ký
        </Button>
      </div>
    </Form>
  );
}
