import React, {useState} from 'react';
import './index.css'
import {Link} from "react-router-dom";

const HeaderInCompany = () => {
    return (
        <div className="app-container" style={{position: "fixed", marginRight: "250px"}}>
            <aside className="sidebar-company">
                <div className="app-logo">YWork</div>
                <ul className="menu">
                    <li><Link to={''}>Quản lý đăng tin</Link></li>
                    <li><Link to={'post'}>Đăng tuyển công việc</Link></li>
                    <li><Link to={'staff'}>Quản lý nhân viên</Link></li>
                    {/*<li><Link to={'candidate'}>Tìm kiếm ứng viên</Link></li>*/}
                    <li><Link to={"thong-ke"}> Thống kê</Link>  </li>
                    <li><Link to={'/company/search'}>Chọn công ty</Link></li>
                </ul>
            </aside>
        </div>
    );
}

export default HeaderInCompany;
