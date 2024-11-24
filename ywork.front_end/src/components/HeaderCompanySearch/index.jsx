import React, {useState} from 'react';
import './index.css'
import {Link} from "react-router-dom";

const HeaderCompanySearch = () => {
    return (
        <div className="app-container" style={{position: "fixed", marginRight: "250px"}}>
            <aside className="sidebar">
                <div className="app-logo">YWork</div>
                <ul className="menu">
                    <li><Link to={''}>Công ty của tôi</Link></li>
                    <li><Link to={'list-company'}>Tìm kiếm công ty</Link></li>
                    <li><Link to={'request-company'}>Trạng thái yêu cầu</Link></li>
                </ul>
            </aside>
        </div>
    );
}

export default HeaderCompanySearch;
