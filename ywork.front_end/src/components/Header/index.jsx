import React, {useEffect, useState} from 'react';
import './index.css'; // Import file CSS cho styling (tùy chọn)
import {FaSearch, FaCheckSquare, FaLaptopCode, FaAward, FaBuilding, FaStar} from 'react-icons/fa';
import {FaBell, FaComments, FaUserCircle} from 'react-icons/fa'; // Import icons
import {Link, useNavigate} from "react-router-dom";
import userApi from "../../api/userApi";
import {configColor} from "../../ConfigColor";
import userAvatar from '../../default.png'

const Header = (props) => {
    const isUser = props.isUser
    const userDetail = props.userDetail
    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-left">
                <span className="header-logo">Tiếp lợi thế - Nối thành công</span>
                <nav className="header-nav">
                    <a href="/login" className="dropdown">
                        Việc làm
                        <div className="dropdown-content">
                            <div className="dropdown-item">
                                <FaSearch className="icon"/> Tìm việc làm
                            </div>
                            <div className="dropdown-item">
                                <FaCheckSquare className="icon"/> Việc làm phù hợp
                            </div>
                            <div className="dropdown-item">
                                <FaLaptopCode className="icon"/> Việc làm IT
                            </div>
                            <div className="dropdown-item">
                                <FaAward className="icon"/> Việc làm Senior
                            </div>
                            <div className="dropdown-item">
                                <FaBuilding className="icon"/> Danh sách công ty
                            </div>
                            <div className="dropdown-item">
                                <FaStar className="icon"/> Top công ty
                            </div>
                        </div>
                    </a>
                    <a href="#hoso">Hồ sơ & CV</a>
                    <a href="#congcu">Công cụ</a>
                    <a href="#camnang">Cẩm nang nghề nghiệp</a>
                    <a href="#topcv">
                        TopCV <span className="pro-badge">Pro</span>
                    </a>
                </nav>
            </div>
            {!isUser ? (
                <div className="header-right">
                    <button className="btn btn-login" onClick={(event) => {
                        navigate("/login")
                    }}>Đăng nhập
                    </button>
                    <button className="btn btn-signup">Đăng ký</button>
                    <button className="btn btn-recruit">
                        <Link to={"/login/company"}
                              style={{color: "white", textAlign: "none"}}>
                            Đăng tin tuyển dụng
                        </Link>
                    </button>
                </div>
            ) : (
                <div className="header-right" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div style={{marginRight: "20px"}}>
                        <span style={{display: "block"}} className="employer-text">Bạn là nhà tuyển dụng?</span>
                        <button style={{
                            fontWeight: "500", marginLeft: "0",
                            color: "white", backgroundColor: configColor
                        }}
                                className="btn btn-post-job">
                            <Link to={"/login/company"}
                                  style={{color: "white", textAlign: "none"}}>
                                Đăng tuyển ngay &raquo;
                            </Link>
                        </button>
                    </div>
                    {/*<button className="btn btn-icon notification-icon">*/}
                    {/*    <FaBell/>*/}
                    {/*</button>*/}
                    {/*<button className="btn btn-icon chat-icon">*/}
                    {/*    <FaComments/>*/}
                    {/*</button>*/}
                    <div className="profile-dropdown">
                        <img
                            src={userDetail.urlAvatar || userAvatar} // Thay bằng đường dẫn ảnh đại diện thật
                            alt="User Profile"
                            className="profile-pic"
                        />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
