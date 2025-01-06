import React, {useEffect, useState} from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import userApi from "../../api/userApi";

const HeaderCompanySearch = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        const call = async ()=>{
            const response = await userApi.detailUser()
            const data = response.object
            console.log(data)
            setUser({
                name: data.nameAccount,
                phone: data.phoneNumber,
                email: data.email,
                avatar: data.urlAvatar,
            })
        }
        call()
    }, []);
    return (
        <div className="app-container" style={{ position: "fixed", marginRight: "250px" }}>
            <aside className="sidebar-company">
                <div className="app-logo">YWork</div>

                {/* Avatar and Name */}
                <div className="user-profile" style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img
                        src={user.avatar}
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
                        {user.name}
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
