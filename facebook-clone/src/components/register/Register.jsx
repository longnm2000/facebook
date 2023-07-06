import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Register() {
  const currentYear = new Date().getFullYear();
  const startYear = 1905; // Năm bắt đầu

  const yearOptions = [];
  for (let year = currentYear; year >= startYear; year--) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }
  return (
    <Form>
      <div className="d-flex gap-2">
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Họ" className="bg-light" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="Tên" className="bg-light" />
        </Form.Group>
      </div>
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Email" className="bg-light" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Mật khẩu mới"
          className="bg-light"
        />
      </Form.Group>
      <p className="note-text m-0 mt-3">Sinh nhật</p>
      <div className="d-flex gap-2">
        <Form.Select aria-label="Default select example">
          <option disabled>Ngày</option>
          {Array.from({ length: 31 }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </Form.Select>
        <Form.Select aria-label="Default select example">
          <option disabled>Tháng</option>
          {Array.from({ length: 12 }, (_, index) => (
            <option key={index} value={index + 1}>
              Tháng {index + 1}
            </option>
          ))}
        </Form.Select>
        <Form.Select aria-label="Default select example">
          <option disabled>Năm</option>
          {yearOptions}
        </Form.Select>
      </div>
      <p className="note-text m-0 mt-3">Giới tính</p>
      <div className="d-flex justify-content-between ">
        <Form.Check
          reverse
          inline
          label="Nam"
          type="radio"
          name="gender"
          className="m-0 radio-gender"
          id="male"
        />
        <Form.Check
          reverse
          inline
          label="Nữ"
          type="radio"
          name="gender"
          className="m-0 radio-gender"
          id="female"
        />
        <Form.Check
          reverse
          inline
          label="Không xác định"
          type="radio"
          name="gender"
          className="m-0 radio-gender"
          id="other"
        />
      </div>
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
