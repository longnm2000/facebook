import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import axios from "axios";

function NewPost({ findUser, fetchData }) {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleClose = () => {
    setShow(false);
    setText("");
    setImage(null);
  };

  const handleShow = () => setShow(true);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    // Upload image to Firebase Storage
    if (image) {
      const storageRef = ref(storage, "images/" + image.name);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      // Post data to API endpoint
      const postData = {
        userId: findUser.id,
        rule: 2,
        content: text,
        image: imageUrl,
        like: [],
      };

      try {
        const response = await axios.post(
          "http://localhost:8000/posts",
          postData
        );
        console.log("Post created successfully:", response.data);
        fetchData();
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }

    handleClose();
  };

  return (
    <div className="bg-white p-3 rounded mt-3">
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tạo bài viết</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              type="text"
              placeholder="Bạn nghĩ gì thế?"
              value={text}
              onChange={handleTextChange}
            />
            <Form.Control
              type="file"
              className="mt-3"
              onChange={handleImageChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div className="d-flex gap-2">
        <img
          src={findUser?.avatar}
          alt=""
          width={"40px"}
          height={"40px"}
          className="rounded-circle object-fit-cover"
        />
        <Button variant="secondary" className="w-100" onClick={handleShow}>
          Bạn đang nghĩ gì
        </Button>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <Button variant="secondary" className="">
          <i class="fa-solid fa-image"></i> Ảnh
        </Button>
        <Button variant="secondary" className="">
          <i class="fa-solid fa-video"></i> Video
        </Button>
        <Button variant="secondary" className="">
          <i class="fa-regular fa-face-smile"></i> Cảm xúc
        </Button>
      </div>
    </div>
  );
}

export default NewPost;
