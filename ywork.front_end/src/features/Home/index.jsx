import React, {useEffect, useState} from "react";
import ProTypes from "prop-types"
import Header from "../../components/Header";
import WorkList from "../Work/WorkList";
import userApi from "../../api/userApi";

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
            }).catch(error => {
            setIsUser(false)
        })
    }, []);

    return (
        <div>
            <Header isUser={isUser} userDetail={userDetail}/>
            <WorkList/>
        </div>
    )
}

export default HomeUser;