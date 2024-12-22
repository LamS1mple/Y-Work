import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";
import userApi from "../../api/userApi";
import Resume from "../../components/Resume/CV1/Resume";
import Cv1 from "../../components/Resume/CV1";

const CVEdit = props => {
    const {cvId} = useParams();
    const [data, setData] = React.useState({typeCV:1});
    useEffect(() => {
        userApi.cvView(cvId)
            .then(res=>{
                const data = res.object;

                setData(JSON.parse(data.info))
                // console.log(data)
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div>
            {data.typeCV === 1 ?(<Cv1 data={data}/>) : null }
        </div>
    );
};

CVEdit.propTypes = {

};

export default CVEdit;