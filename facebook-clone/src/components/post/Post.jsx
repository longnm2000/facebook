import React from "react";
import "./Post.css";

export default function Post() {
  return (
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
            <h5>Đường viền tròn</h5>
            <div>
              <span>14 giờ </span>
              <i class="fa-solid fa-earth-americas"></i>
            </div>
          </div>
        </div>
        <i class="fa-solid fa-ellipsis"></i>
      </div>
      <div className="mt-2">
        <p>Quá khứ đen của đôi tình nhân 🫠</p>
        <img
          src="https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/357420737_797309531767906_5995455118568977751_n.jpg?stp=cp6_dst-jpg_p180x540&_nc_cat=108&cb=99be929b-59f725be&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=mIHiS7RbicMAX_73Us0&_nc_ht=scontent.fhan3-3.fna&oh=00_AfAIdtwViOWjleSk9IHVxTPJYzJ48_9X-j5hQ5SjhYVWxw&oe=64ABEBF4"
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
          <span>4,1K</span>
        </div>
        <div>
          <span>50K </span>
          <i class="fa-regular fa-message"></i>
        </div>
      </div>
      <div className="d-flex justify-content-between border-top mt-3 pt-2">
        <button className="btn btn-light flex-grow-1">
          <i class="fa-regular fa-thumbs-up"></i> Thích
        </button>
        <button className="btn btn-light flex-grow-1">
          <i class="fa-regular fa-message"></i> Bình luận
        </button>
        <button className="btn btn-light flex-grow-1">
          <i class="fa-solid fa-share"></i> Chia sẻ
        </button>
      </div>
    </div>
  );
}
