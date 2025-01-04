import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";
import userApi from "../../api/userApi";
import Resume from "../../components/Resume/CV1/Resume";
import Resume2 from "../../components/Resume/CV2/Resume2";

const CVView = props => {
    const {cvId} = useParams();
    const [data, setdata] = React.useState({typeCV:0});
    useEffect(() => {
        userApi.cvView(cvId)
            .then(res=>{
                const data = res.object;
                console.log(data)
                setdata(JSON.parse(data.info))

            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div>
            {data.typeCV === 1 ?(<Resume resumeData={data} submit={null}/>) : null}
            {data.typeCV === 2 ?(<Resume2 resumeData={data} submit={null}/>) : null}

        </div>
    );
};

CVView.propTypes = {

};

export default CVView;