import React, { useState } from 'react';
import './index.css'; // Import file CSS cho styling (tùy chọn)
import {
    FaSearch,
    FaCheckSquare,
    FaLaptopCode,
    FaAward,
    FaBuilding,
    FaStar,
    FaUserCircle,
    FaSignOutAlt
} from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import userAvatar from '../../default.png';

const Header = (props) => {
    const isUser = props.isUser;
    const userDetail = props.userDetail;
    const navigate = useNavigate();

    // Trạng thái để hiển thị dropdown
    const [showDropdown, setShowDropdown] = useState(false);

    const handleNavigate = (url) => {
        navigate(url);
    };

    const handleLogout = () => {
        // Xử lý đăng xuất (có thể gọi API hoặc xóa token)
        localStorage.removeItem("access_token")
        navigate('/login'); // Điều hướng về trang đăng nhập
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="header">
            <div className="header-left">
                <span className="header-logo">Tiếp lợi thế - Nối thành công</span>
                <nav className="header-nav" style={{ display: "flex" }}>
                    {/* Dropdown chưa hoàn thiện */}
                    {/* <div className="dropdown" style={{ marginRight: "20px" }}>
                        <div><span onClick={() => handleNavigate('/')}>Việc làm</span></div>
                        <div><span onClick={() => handleNavigate('/danh-sach-cong ty')}>Danh sách công ty</span></div>
                        {isUser && (
                            <div
                                className="dropdown-item"
                                onClick={() => handleNavigate('/job/apply')}
                            >
                                <FaCheckSquare className="icon" /> Việc đã ứng tuyển
                            </div>
                        )}
                    </div> */}

                    <div style={{ marginRight: "20px" }}>
                        <span onClick={() => handleNavigate('/')}>Việc làm</span>
                    </div>
                    <div style={{ marginRight: "20px" }}>
                        <span onClick={() => handleNavigate('/danh-sach-cong-ty')}>Danh sách công ty</span>
                    </div>
                    {isUser && (
                        <div
                            style={{ marginRight: "20px" }}
                            onClick={() => handleNavigate('/job/apply')}
                        >
                            Việc đã ứng tuyển
                        </div>
                    )}
                    <div style={{ marginRight: "20px" }} onClick={() => handleNavigate("/cv")}>Hồ sơ & CV</div>
                </nav>
            </div>
            {!isUser ? (
                <div className="header-right">
                    <button className="btn btn-login" onClick={() => navigate("/login")}>Đăng nhập</button>
                    <button className="btn btn-signup">Đăng ký</button>
                    <button className="btn btn-recruit">
                        <Link to={"/login/company"} style={{ color: "white", textAlign: "none" }}>
                            Đăng tin tuyển dụng
                        </Link>
                    </button>
                </div>
            ) : (
                <div className="header-right" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ marginRight: "20px" }}>
                        <span style={{ display: "block" }} className="employer-text">Bạn là nhà tuyển dụng?</span>
                        <button
                            style={{
                                fontWeight: "500", marginLeft: "0",
                                color: "white", backgroundColor: "#1890ff"
                            }}
                            className="btn btn-post-job"
                        >
                            <Link to={"/login/company"} style={{ color: "white", textAlign: "none" }}>
                                Đăng tuyển ngay &raquo;
                            </Link>
                        </button>
                    </div>
                    <div className="profile-dropdown">
                        <img
                            src={userDetail.urlAvatar || userAvatar}
                            alt="User Profile"
                            className="profile-pic"
                            onClick={toggleDropdown}
                            style={{ cursor: "pointer" }}
                        />
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <div className="dropdown-item" onClick={() => handleNavigate('/profile-user')}>
                                    <FaUserCircle className="icon" /> Tài khoản của tôi
                                </div>
                                <div className="dropdown-item" onClick={handleLogout}>
                                    <FaSignOutAlt className="icon" /> Đăng xuất
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
