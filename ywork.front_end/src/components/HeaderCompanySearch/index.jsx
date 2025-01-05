import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const HeaderCompanySearch = () => {
    return (
        <div className="app-container" style={{ position: "fixed", marginRight: "250px" }}>
            <aside className="sidebar-company">
                <div className="app-logo">YWork</div>

                {/* Avatar and Name */}
                <div className="user-profile" style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img
                        src="https://via.placeholder.com/80"
                        alt="User Avatar"
                        style={{
                            margin:'0 auto',
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            marginBottom: '10px'
                        }}
                    />
                    <div className="user-name" style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        Nguyễn Đức Trọng
                    </div>
                </div>

                <ul className="menu">
                    <li><Link to={''}>Công ty của tôi</Link></li>
                    <li><Link to={'list-company'}>Tìm kiếm công ty</Link></li>
                    <li><Link to={'request-company'}>Trạng thái yêu cầu</Link></li>
                </ul>
            </aside>
        </div>
    );
};

export default HeaderCompanySearch;
