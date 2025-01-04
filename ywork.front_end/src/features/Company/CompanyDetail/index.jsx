import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import WorkItem from "../../Work/WorkItem";
import workApi from "../../../api/workApi";
import {useParams} from "react-router-dom";
import companyApi from "../../../api/companyApi";

const CompanyDetail = props => {
    const styles = {
        body: {
            fontFamily: 'Arial, sans-serif',
            margin: 0,
            padding: 0,
            backgroundColor: '#f3f4f6',
        },
        container: {
            width: '90%',
            maxWidth: '1200px',
            margin: '20px auto',
        },
        header: {
            backgroundColor: 'rgb(19, 62, 135)',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        logo: {
            height: '80px',
            borderRadius: '50%',
        },
        details: {
            flex: 1,
            marginLeft: '20px',
        },
        h1: {
            margin: 0,
            fontSize: '24px',
        },
        link: {
            color: 'white',
            textDecoration: 'none',
        },
        followButton: {
            backgroundColor: 'white',
            color: 'rgb(19, 62, 135)',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold',
        },
        info: {
            marginTop: '20px',
            display: 'flex',
            gap: '20px',
        },
        box: {
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            flex: 2,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        box2: {
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            flex: 1,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        h2: {
            marginTop: 0,
            fontSize: '20px',
            color: 'rgb(19, 62, 135)',
        },
        p: {
            margin: '10px 0',
            lineHeight: '1.6',
        },
        map: {
            width: '100%',
            height: '300px',
            border: '0',
            borderRadius: '8px',
        },
        jobsSection: {
            marginTop: '20px',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        jobItem: {
            display: 'flex',
            alignItems: 'center',
            padding: '10px 0',
            borderBottom: '1px solid #eaeaea',
        },
        jobLogo: {
            height: '50px',
            marginRight: '20px',
        },
        jobDetails: {
            flex: 1,
        },
        jobTitle: {
            fontSize: '18px',
            margin: 0,
            color: 'rgb(19, 62, 135)',
        },
        jobMeta: {
            fontSize: '14px',
            color: '#666',
        },
        applyButton: {
            backgroundColor: 'rgb(19, 62, 135)',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold',
        },
    };

    const { companyId} = useParams();
    const [companyDetail, setDetailCompany] = useState({})
    useEffect(()=>{
        const fetchCompany = async () =>{
            const companyDetail = await companyApi.companyDetail(companyId);
            setDetailCompany(companyDetail.object)
        }
        fetchCompany()
    },[])
    const [listWork, setWorkList] = useState([]);
    useEffect(() =>{
        const fetchUser = async () =>{
            const workList = await workApi.jobCompanyPublic(companyId);
            // console.log(workList)
            setWorkList(workList.object)
            console.log(listWork)
        };
        fetchUser()
    },[])

    const li = (data) => data && data.split("\n") // Tách từng dòng
        .map((line) => line.trim()) // Loại bỏ khoảng trắng thừa
        .filter((line) => line.length > 0) // Loại bỏ dòng trống
        .map((line, index) => <p key={index}>{line}</p>);
    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <header style={styles.header}>
                    <img src={companyDetail.urlAvatar} alt="PYS Travel Logo" style={styles.logo} />
                    <div style={styles.details}>
                        <h1 style={styles.h1}>{companyDetail.nameCompany}</h1>
                        <p>{companyDetail.field}</p>
                        {/*<a href="https://pystravel.vn" target="_blank" rel="noopener noreferrer"*/}
                        {/*   style={styles.link}>https://pystravel.vn</a>*/}
                        <p>{companyDetail.quantityStaff} nhân viên</p>
                    </div>
                    {/*<a href="#" style={styles.followButton}>+ Theo dõi công ty</a>*/}
                </header>

                <div style={styles.info}>
                    <div style={styles.box}>
                        <h2 style={styles.h2}>Giới thiệu công ty</h2>
                        <p style={styles.p}>{li(companyDetail.descriptionCompany)}</p>
                    </div>
                    <div style={styles.box2}>
                        <h2 style={styles.h2}>Thông tin liên hệ</h2>
                        <p style={styles.p}><strong>Địa chỉ công ty:</strong></p>
                        <p style={styles.p}>
                            {companyDetail.locationDetailCompany},
                            Phường {companyDetail.nameWard}, Quận {companyDetail.nameDistrict},
                            Thành phố {companyDetail.nameProvince}
                        </p>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.564876659261!2d105.78238741440763!3d21.013708986007192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4e0ae4e8e1%3A0x89d9f5dce8773f3d!2zVGjhuqFjaCBwaOG6p24gUuG7k25nIE5naOG7hywgQ8O0bmcgVmluaCBUaOG7iywgQ-G7lSBMyxjhu5NuZywgQ2F1IEdp4buBdSwgSMOgIE5vaSwgVmnhu4duIE5hbQ!5e0!3m2!1sen!2s!4v1615379279271!5m2!1sen!2s"
                            style={styles.map}
                            allowFullScreen=""
                            loading="lazy"
                            title="Company Map"
                        ></iframe>
                    </div>
                </div>

                <div style={styles.jobsSection}>
                    <h2 style={styles.h2}>Tuyển dụng</h2>
                    {listWork.map((job, index) => (
                        <WorkItem key={index} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );

};

CompanyDetail.propTypes = {
    
};

export default CompanyDetail;