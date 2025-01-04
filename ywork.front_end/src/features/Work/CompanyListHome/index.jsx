// Import necessary libraries
import React, {useEffect, useState} from "react";
import './index.css'
import companyApi from "../../../api/companyApi";
import {useNavigate} from "react-router-dom";
const CompanyListHome = () => {
    // Mock data
    const nav = useNavigate();
    const companies = [
        {
            name: "CHI NHÁNH CÔNG TRÌNH VIETTEL ĐỒNG NAI",
            industry: "Xây dựng",
            jobs: 1,
            logo: "https://via.placeholder.com/50", // Replace with the real logo
        },
        {
            name: "CÔNG TY CỔ PHẦN KỸ THUẬT IPC",
            industry: "Xây dựng",
            jobs: 9,
            logo: "https://via.placeholder.com/50",
        },
        {
            name: "CÔNG TY TNHH THƯƠNG MẠI MPE",
            industry: "Điện tử / Điện lạnh",
            jobs: 4,
            logo: "https://via.placeholder.com/50",
        },
        // Add more companies as needed
    ];

    const [dataCompany, setDataComapny] = useState([])

    useEffect(() => {
        const apiCall = async ()=>{
            const data =await companyApi.publicListCompany()
            setDataComapny(data.object)
        }
        apiCall()
    }, []);

    return (
        <div className="app">
            <div
                style={{
                    // backgroundImage: ,
                    // height: "150px",
                    // width: "100%",
                    // textAlign: "left",
                    // paddingLeft : "10px",
                    background: `url('/company-popular-img.webp') no-repeat 50%`,
                    backgroundSize: "cover",
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    padding: '34px 32px 35px',
                    position: 'relative',
                    textAlign:'left'
                }}
            >
                <h1 style={{
                    color: '#0e4a2c',
                    flexWrap: 'wrap',
                    fontSize: '24px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    letterSpacing: '.24px',
                    lineHeight: '133%',
                    margin: '0'
                }}>Thương hiệu lớn tiêu biểu</h1>
                <p style={{display: "block"}}>
                    Những thương hiệu tuyển dụng đã khẳng định được vị thế trên thị trường.
                </p>
            </div>

            <div className="categories">
                <button className="category">Bảo hiểm</button>
                <button className="category">Nhà hàng / Khách sạn</button>
                <button className="category">IT - Phần cứng</button>
                <button className="category">Marketing</button>
                <button className="category">Chứng khoán</button>
            </div>

            <div className="company-grid">
                {dataCompany.map((company, index) => (
                    <div onClick={() => {
                        nav("/company/detail/" + company.idCompany)
                    }} className="company-card" key={company.idCompany}>
                        <div style={{display: 'flex'}}>
                            <img src={company.urlAvatar} alt={`${company.nameCompany} logo`} className="company-logo"/>
                            <div>
                                <h2 style={{marginTop: '0'}} className="company-name">{company.nameCompany}</h2>
                            </div>
                        </div>
                        <p className="company-industry">{company.field}</p>
                        <p className="company-jobs">{company.quantityWork} việc làm</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyListHome;
