import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import companyApi from "../../../../api/companyApi";
import CompanyCard from "../CompanyCard";

const CompanyList = props => {
    const [listCompany, setListCompany] = React.useState([]);
    useEffect(() => {
        companyApi.companySearchList({status: ""})
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
};

CompanyList.propTypes = {};

export default CompanyList;