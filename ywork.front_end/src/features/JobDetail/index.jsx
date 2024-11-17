import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useParams} from "react-router-dom";
import Header from "../../components/Header";
import JobOverview from "./components/JobOverview";
import JobDescription from "./components/JobDescription";
import JobApply from "./components/JobApply";
import CompanyCard from "./components/CompanyCard";
import InfoCard from "./components/InfoCard";
import workApi from "../../api/workApi";
import companyApi from "../../api/companyApi";

JobDetail.propTypes = {};


function JobDetail() {
    const [loading, setLoading] = useState(true);
    const {idJob, companyId} = useParams();

    const [workDetail, setWorkDetail] = useState({});
    const [companyDetail, setCompanyDetail] = useState({})

    useEffect(() => {
        const fetchDataWork = async () => {
            const data = await workApi.workDetail(idJob);
            setWorkDetail(data.object)
            setLoading(false)
        }
        fetchDataWork();

    }, []);

    useEffect(() => {
        const fetchDataCompany = async () => {
            const data = await companyApi.companyDetail(companyId);
            setCompanyDetail(data.object)
        }
        if (!loading) {
            fetchDataCompany()
        }
    }, [workDetail]);
    const [isOpen, setIsOpen] = React.useState(false);
    const openApply = () => {
        setIsOpen(true)
    }
    const closeApply = () => {
        setIsOpen(false)
    }

    if (loading) {
        return (
            <div><Header/></div>
        )
    }

    return (
        <div>
            <Header/>
            <div className="job-detail-container" style={{
                padding: '20px', fontFamily: 'Arial, sans-serif',
                display: 'flex',
                justifyContent: 'center',
            }}>

                <div className="left-job">
                    {/* Job Overview */}
                    <JobOverview onOpen={openApply} workDetail={workDetail}/>

                    {/* Job Details */}
                    <JobDescription onOpen={openApply} workDetail={workDetail}/>
                </div>
                <div className='right-job' style={{marginLeft: '20px'}}>
                    {/* Company Information */}
                    <CompanyCard companyDetail={companyDetail}/>

                    {/* General Information */}
                    <InfoCard workDetail={workDetail}/>
                </div>
            </div>
            {isOpen && <JobApply onClose={closeApply}/>}
        </div>
    );
}

export default JobDetail;