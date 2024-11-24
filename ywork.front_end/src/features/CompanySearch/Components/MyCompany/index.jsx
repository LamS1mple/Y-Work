import React, {useEffect, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import CompanyCard from "../CompanyCard";
import {Box, InputAdornment, TextField} from "@mui/material";
import companyApi from "../../../../api/companyApi";

const MyCompany = props => {
    const [listCompany, setListCompany] = React.useState([]);
    useEffect(() => {
        companyApi.companySearchList({status: "1"})
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

MyCompany.propTypes = {};

export default MyCompany;