import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import companyApi from "../../../../api/companyApi";
import CompanyCard from "../CompanyCard";

CompanyRequest.propTypes = {};

function CompanyRequest(props) {
    const [listCompany, setListCompany] = React.useState([]);
    useEffect(() => {
        companyApi.companySearchList({status: "2,3"})
            .then(res => {
                setListCompany(res.object);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px'
            }}>
                {listCompany.map((item, index) => (
                    <CompanyCard company={item} key={item.idCompany}/>
                ))}
            </div>
        </div>
    );
}

export default CompanyRequest;