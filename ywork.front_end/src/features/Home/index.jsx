import React, {useEffect, useState} from "react";
import ProTypes from "prop-types"
import Header from "../../components/Header";
import WorkList from "../Work/WorkList";
import userApi from "../../api/userApi";
import {Outlet} from "react-router-dom";
import Footer from "../../components/Footer";

HomeUser.prototype = {
    workList: ProTypes.array,
};
HomeUser.defaultProps = {
    workList: [],
};

function HomeUser() {
    // const [color, setColor] = useState(0);
    const [isUser, setIsUser] = useState(false);
    const [userDetail, setUserDetail] = useState({})

    useEffect(() => {
        userApi.detailUser()
            .then(data => {
                setUserDetail(data.object)
                setIsUser(true)
                localStorage.setItem('isUser', JSON.stringify(true));

            }).catch(error => {
            localStorage.setItem('isUser', JSON.stringify(false));

            setIsUser(false)
        })
    }, []);

    return (
        <div>
            <Header isUser={isUser} userDetail={userDetail}/>
            <Outlet/>
            <Footer />
        </div>
    )
}

export default HomeUser;