
import React, { useState } from "react";
import ProTypes from "prop-types"
import Header from "../../components/Header";
import WorkList from "../Work/WorkList";

HomeUser.prototype = {
    workList : ProTypes.array,
};
HomeUser.defaultProps = {
    workList:[],
};

function HomeUser(){
    // const [color, setColor] = useState(0);
    return (
        <div>
            <Header />
            <WorkList />
        </div>
    )
}

export default HomeUser;