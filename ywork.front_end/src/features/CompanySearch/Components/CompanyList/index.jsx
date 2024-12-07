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
    const handleChangeStatus = (idCompany) =>{
        const update = listCompany.map(data =>{
            if (data.idCompany === idCompany){
                return ({
                    ...data,
                    status: 2
                })
            }else return data;
        })
        setListCompany(update)
    }
    return (
        <div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px'
            }}>
                {listCompany.map((item, index) => (
                    <CompanyCard company={item} key={item.idCompany} handleChangeStatus={handleChangeStatus} />
                ))}
            </div>
        </div>
    );
};

CompanyList.propTypes = {};

export default CompanyList;