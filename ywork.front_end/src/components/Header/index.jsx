import React from 'react';
import './index.css'; // Import file CSS cho styling (tùy chọn)
import {
    FaSearch,
    FaCheckSquare,
    FaLaptopCode,
    FaAward,
    FaBuilding,
    FaStar,
    FaUserCircle
} from 'react-icons/fa';
import {Link, useNavigate} from "react-router-dom";
import userAvatar from '../../default.png';

const Header = (props) => {
    const isUser = props.isUser;
    const userDetail = props.userDetail;
    const navigate = useNavigate();

    const handleNavigate = (url) => {
        navigate(url);
    };

    return (
        <header className="header">
            <div className="header-left">
                <span className="header-logo">Tiếp lợi thế - Nối thành công</span>
                <nav className="header-nav" style={{display:"flex"}}>
                    <div className="dropdown" style={{marginRight:"20px"}}>
                        <div><span onClick={() => handleNavigate('/')}>Việc làm</span></div>
                        <div className="dropdown-content">
                            <div
                                className="dropdown-item"
                                onClick={() => handleNavigate('/')}
                            >
                                <FaSearch className="icon"/> Tìm việc làm
                            </div>
                            <div
                                className="dropdown-item"
                                onClick={() => handleNavigate('/viec-lam-phu-hop')}
                            >
                                <FaCheckSquare className="icon"/> Việc làm phù hợp
                            </div>
                            {isUser && (
                                <div
                                    className="dropdown-item"
                                    onClick={() => handleNavigate('/job/apply')}
                                >
                                    <FaCheckSquare className="icon"/> Việc đã ứng tuyển
                                </div>
                            )}
                            <div
                                className="dropdown-item"
                                onClick={() => handleNavigate('/viec-lam-it')}
                            >
                                <FaLaptopCode className="icon"/> Việc làm IT
                            </div>
                            <div
                                className="dropdown-item"
                                onClick={() => handleNavigate('/viec-lam-senior')}
                            >
                                <FaAward className="icon"/> Việc làm Senior
                            </div>
                            <div
                                className="dropdown-item"
                                onClick={() => handleNavigate('/danh-sach-cong-ty')}
                            >
                                <FaBuilding className="icon"/> Danh sách công ty
                            </div>
                            <div
                                className="dropdown-item"
                                onClick={() => handleNavigate('/top-cong-ty')}
                            >
                                <FaStar className="icon"/> Top công ty
                            </div>
                        </div>
                    </div>
                    <div style={{marginRight:"20px"}} onClick={()=>handleNavigate("/cv")}>Hồ sơ & CV</div>
                    <div style={{marginRight:"20px"}}>Công cụ</div>
                    <div style={{marginRight:"20px"}}>Cẩm nang nghề nghiệp</div>
                </nav>
            </div>
            {!isUser ? (
                <div className="header-right">
                    <button className="btn btn-login" onClick={() => navigate("/login")}>Đăng nhập</button>
                    <button className="btn btn-signup">Đăng ký</button>
                    <button className="btn btn-recruit">
                        <Link to={"/login/company"} style={{color: "white", textAlign: "none"}}>
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
                            color: "white", backgroundColor: "#1890ff"
                        }}
                                className="btn btn-post-job">
                            <Link to={"/login/company"} style={{color: "white", textAlign: "none"}}>
                                Đăng tuyển ngay &raquo;
                            </Link>
                        </button>
                    </div>
                    <div className="profile-dropdown">
                        <img
                            src={userDetail.urlAvatar || userAvatar}
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
