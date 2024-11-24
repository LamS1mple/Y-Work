import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../components/Header";
import JobOverview from "./components/JobOverview";
import JobDescription from "./components/JobDescription";
import JobApply from "./components/JobApply";
import CompanyCard from "./components/CompanyCard";
import InfoCard from "./components/InfoCard";
import workApi from "../../api/workApi";
import companyApi from "../../api/companyApi";
import userApi from "../../api/userApi";

JobDetail.propTypes = {};


function JobDetail(props) {
    const [isUser, setIsUser] = useState(true);
    // const [userDetail, setUserDetail] = useState({})
    const navigate = useNavigate()
    // useEffect(() => {
    //     userApi.detailUser()
    //         .then(data => {
    //             setUserDetail(data.object)
    //             setIsUser(true)
    //         }).catch(error => {
    //         setIsUser(false)
    //     })
    // }, []);


    const [loading, setLoading] = useState(false);
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
            <div></div>
        )
    }
    return (
        <div>
            {/*<Header userDetail={userDetail} isUser={isUser}/>*/}
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
            {isOpen ? (isUser ? <JobApply onClose={closeApply} workDetail={workDetail}/> : navigate("/login")) : ""}
        </div>
    );
}

export default JobDetail;