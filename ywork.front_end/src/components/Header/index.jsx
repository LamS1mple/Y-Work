import React from 'react';
import './index.css'; // Import file CSS cho styling (tùy chọn)
import { FaSearch, FaCheckSquare, FaLaptopCode, FaAward, FaBuilding, FaStar } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";

const Header = () => {
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
                                <FaSearch className="icon" /> Tìm việc làm
                            </div>
                            <div className="dropdown-item">
                                <FaCheckSquare className="icon" /> Việc làm phù hợp
                            </div>
                            <div className="dropdown-item">
                                <FaLaptopCode className="icon" /> Việc làm IT
                            </div>
                            <div className="dropdown-item">
                                <FaAward className="icon" /> Việc làm Senior
                            </div>
                            <div className="dropdown-item">
                                <FaBuilding className="icon" /> Danh sách công ty
                            </div>
                            <div className="dropdown-item">
                                <FaStar className="icon" /> Top công ty
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
            <div className="header-right">
                <button className="btn btn-login" onClick={(event) => {navigate("/login")}}>Đăng nhập</button>
                <button className="btn btn-signup">Đăng ký</button>
                <button className="btn btn-recruit">Đăng tuyển & tìm hồ sơ</button>
            </div>
        </header>
    );
};

export default Header;
