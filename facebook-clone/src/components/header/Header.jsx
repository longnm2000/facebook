import React from "react";
import "./Header.css";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <Container
        fluid
        className="position-fixed bg-white top-0 border-bottom shadow-sm"
      >
        <Row className="fb-header">
          <Col className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <NavLink to={"/"}>
                <img
                  src="/fb_logo_2.png"
                  alt=""
                  id="header-logo"
                  className="me-2"
                />
              </NavLink>
              <label
                htmlFor="search-info"
                className=" px-3 py-2 rounded-5 bg-input-group"
              >
                <i className="fa-solid fa-magnifying-glass me-2 "></i>
                <input
                  type="text"
                  name="search-info"
                  id="search-info"
                  className="border-0 bg-input-group"
                  placeholder="Tìm kiếm trên Facebook"
                />
              </label>
            </div>
          </Col>
          <Col className="d-flex justify-content-center">
            <div className="d-flex h-100">
              <div className="header-group-route d-flex align-items-center justify-content-center">
                <NavLink
                  to={"/"}
                  className={
                    "w-100 h-100 d-flex justify-content-center align-items-center header-navlink"
                  }
                >
                  <svg
                    viewBox="0 0 28 28"
                    className="x1lliihq x1k90msu x2h7rmj x1qfuztq x5e5rjt"
                    fill="currentColor"
                    height="28"
                    width="28"
                  >
                    <path d="M25.825 12.29C25.824 12.289 25.823 12.288 25.821 12.286L15.027 2.937C14.752 2.675 14.392 2.527 13.989 2.521 13.608 2.527 13.248 2.675 13.001 2.912L2.175 12.29C1.756 12.658 1.629 13.245 1.868 13.759 2.079 14.215 2.567 14.479 3.069 14.479L5 14.479 5 23.729C5 24.695 5.784 25.479 6.75 25.479L11 25.479C11.552 25.479 12 25.031 12 24.479L12 18.309C12 18.126 12.148 17.979 12.33 17.979L15.67 17.979C15.852 17.979 16 18.126 16 18.309L16 24.479C16 25.031 16.448 25.479 17 25.479L21.25 25.479C22.217 25.479 23 24.695 23 23.729L23 14.479 24.931 14.479C25.433 14.479 25.921 14.215 26.132 13.759 26.371 13.245 26.244 12.658 25.825 12.29"></path>
                  </svg>
                </NavLink>
              </div>
              <div className="header-group-route d-flex align-items-center justify-content-center">
                <svg
                  viewBox="0 0 28 28"
                  className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6"
                  fill="currentColor"
                  height="28"
                  width="28"
                >
                  <path d="M10.5 4.5c-2.272 0-2.75 1.768-2.75 3.25C7.75 9.542 8.983 11 10.5 11s2.75-1.458 2.75-3.25c0-1.482-.478-3.25-2.75-3.25zm0 8c-2.344 0-4.25-2.131-4.25-4.75C6.25 4.776 7.839 3 10.5 3s4.25 1.776 4.25 4.75c0 2.619-1.906 4.75-4.25 4.75zm9.5-6c-1.41 0-2.125.841-2.125 2.5 0 1.378.953 2.5 2.125 2.5 1.172 0 2.125-1.122 2.125-2.5 0-1.659-.715-2.5-2.125-2.5zm0 6.5c-1.999 0-3.625-1.794-3.625-4 0-2.467 1.389-4 3.625-4 2.236 0 3.625 1.533 3.625 4 0 2.206-1.626 4-3.625 4zm4.622 8a.887.887 0 00.878-.894c0-2.54-2.043-4.606-4.555-4.606h-1.86c-.643 0-1.265.148-1.844.413a6.226 6.226 0 011.76 4.336V21h5.621zm-7.122.562v-1.313a4.755 4.755 0 00-4.749-4.749H8.25A4.755 4.755 0 003.5 20.249v1.313c0 .518.421.938.937.938h12.125c.517 0 .938-.42.938-.938zM20.945 14C24.285 14 27 16.739 27 20.106a2.388 2.388 0 01-2.378 2.394h-5.81a2.44 2.44 0 01-2.25 1.5H4.437A2.44 2.44 0 012 21.562v-1.313A6.256 6.256 0 018.25 14h4.501a6.2 6.2 0 013.218.902A5.932 5.932 0 0119.084 14h1.861z"></path>
                </svg>
              </div>
              <div className="header-group-route d-flex align-items-center justify-content-center">
                <svg
                  viewBox="0 0 28 28"
                  className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6"
                  fill="currentColor"
                  height="28"
                  width="28"
                >
                  <path d="M8.75 25.25C8.336 25.25 8 24.914 8 24.5 8 24.086 8.336 23.75 8.75 23.75L19.25 23.75C19.664 23.75 20 24.086 20 24.5 20 24.914 19.664 25.25 19.25 25.25L8.75 25.25ZM17.163 12.846 12.055 15.923C11.591 16.202 11 15.869 11 15.327L11 9.172C11 8.631 11.591 8.297 12.055 8.576L17.163 11.654C17.612 11.924 17.612 12.575 17.163 12.846ZM21.75 20.25C22.992 20.25 24 19.242 24 18L24 6.5C24 5.258 22.992 4.25 21.75 4.25L6.25 4.25C5.008 4.25 4 5.258 4 6.5L4 18C4 19.242 5.008 20.25 6.25 20.25L21.75 20.25ZM21.75 21.75 6.25 21.75C4.179 21.75 2.5 20.071 2.5 18L2.5 6.5C2.5 4.429 4.179 2.75 6.25 2.75L21.75 2.75C23.821 2.75 25.5 4.429 25.5 6.5L25.5 18C25.5 20.071 23.821 21.75 21.75 21.75Z"></path>
                </svg>
              </div>
              <div className="header-group-route d-flex align-items-center justify-content-center">
                <svg
                  viewBox="0 0 28 28"
                  className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6"
                  fill="currentColor"
                  height="28"
                  width="28"
                >
                  <path d="M25.5 14C25.5 7.649 20.351 2.5 14 2.5 7.649 2.5 2.5 7.649 2.5 14 2.5 20.351 7.649 25.5 14 25.5 20.351 25.5 25.5 20.351 25.5 14ZM27 14C27 21.18 21.18 27 14 27 6.82 27 1 21.18 1 14 1 6.82 6.82 1 14 1 21.18 1 27 6.82 27 14ZM7.479 14 7.631 14C7.933 14 8.102 14.338 7.934 14.591 7.334 15.491 6.983 16.568 6.983 17.724L6.983 18.221C6.983 18.342 6.99 18.461 7.004 18.578 7.03 18.802 6.862 19 6.637 19L6.123 19C5.228 19 4.5 18.25 4.5 17.327 4.5 15.492 5.727 14 7.479 14ZM20.521 14C22.274 14 23.5 15.492 23.5 17.327 23.5 18.25 22.772 19 21.878 19L21.364 19C21.139 19 20.97 18.802 20.997 18.578 21.01 18.461 21.017 18.342 21.017 18.221L21.017 17.724C21.017 16.568 20.667 15.491 20.067 14.591 19.899 14.338 20.067 14 20.369 14L20.521 14ZM8.25 13C7.147 13 6.25 11.991 6.25 10.75 6.25 9.384 7.035 8.5 8.25 8.5 9.465 8.5 10.25 9.384 10.25 10.75 10.25 11.991 9.353 13 8.25 13ZM19.75 13C18.647 13 17.75 11.991 17.75 10.75 17.75 9.384 18.535 8.5 19.75 8.5 20.965 8.5 21.75 9.384 21.75 10.75 21.75 11.991 20.853 13 19.75 13ZM15.172 13.5C17.558 13.5 19.5 15.395 19.5 17.724L19.5 18.221C19.5 19.202 18.683 20 17.677 20L10.323 20C9.317 20 8.5 19.202 8.5 18.221L8.5 17.724C8.5 15.395 10.441 13.5 12.828 13.5L15.172 13.5ZM16.75 9C16.75 10.655 15.517 12 14 12 12.484 12 11.25 10.655 11.25 9 11.25 7.15 12.304 6 14 6 15.697 6 16.75 7.15 16.75 9Z"></path>
                </svg>
              </div>
              <div className="header-group-route d-flex align-items-center justify-content-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="28px"
                  height="28px"
                  className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 x1fgtraw xgd8bvy"
                >
                  <g fillRule="evenodd" transform="translate(-444 -204)">
                    <g>
                      <path
                        fillRule="nonzero"
                        d="M98.5 5.75v4a.75.75 0 1 0 1.5 0v-4a.75.75 0 1 0-1.5 0z"
                        transform="translate(351.5 208.5)"
                      ></path>
                      <path
                        fillRule="nonzero"
                        d="M97.25 8.5h4a.75.75 0 1 0 0-1.5h-4a.75.75 0 1 0 0 1.5z"
                        transform="translate(351.5 208.5)"
                      ></path>
                      <path
                        fillRule="nonzero"
                        d="M109.5 14.5h-10a7 7 0 0 1 0-14h10a7 7 0 0 1 0 14zm0-1.5a5.5 5.5 0 0 0 0-11h-10a5.5 5.5 0 0 0 0 11h10z"
                        transform="translate(351.5 208.5)"
                      ></path>
                      <path
                        d="M109 9.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0m3-3a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0"
                        transform="translate(351.5 208.5)"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-end gap-2 align-items-center h-100">
              <div className="header-group-btn d-flex justify-content-center align-items-center rounded-5">
                <svg
                  fill="currentColor"
                  viewBox="0 0 44 44"
                  width="1em"
                  height="1em"
                >
                  <circle cx="7" cy="7" r="6"></circle>
                  <circle cx="22" cy="7" r="6"></circle>
                  <circle cx="37" cy="7" r="6"></circle>
                  <circle cx="7" cy="22" r="6"></circle>
                  <circle cx="22" cy="22" r="6"></circle>
                  <circle cx="37" cy="22" r="6"></circle>
                  <circle cx="7" cy="37" r="6"></circle>
                  <circle cx="22" cy="37" r="6"></circle>
                  <circle cx="37" cy="37" r="6"></circle>
                </svg>
              </div>
              <div className="header-group-btn d-flex justify-content-center align-items-center rounded-5">
                <svg
                  viewBox="0 0 28 28"
                  alt=""
                  className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0"
                  fill="currentColor"
                  height="20"
                  width="20"
                >
                  <path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z"></path>
                </svg>
              </div>
              <div className="header-group-btn d-flex justify-content-center align-items-center rounded-5">
                <svg
                  viewBox="0 0 28 28"
                  alt=""
                  className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0"
                  fill="currentColor"
                  height="20"
                  width="20"
                >
                  <path d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z"></path>
                </svg>
              </div>
              <div className="header-group-btn d-flex justify-content-center align-items-center rounded-5">
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;
