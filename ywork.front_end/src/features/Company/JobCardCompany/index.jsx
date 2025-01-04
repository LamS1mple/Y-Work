import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
const JobCardCompany = props => {
    return (
        <div className="job-card">
            <div className="job-logo">
                <img
                    src="https://via.placeholder.com/60"
                    alt="Company Logo"
                    className="logo"
                />
            </div>
            <div className="job-details">
                <h3 className="job-title">
                    Nhân Viên Kinh Doanh/ Tư Vấn/ Sales Bất Động Sản Tại Hà Nội, Hà Nam
                    (LC Từ 6-21 Triệu, Th...)
                </h3>
                <p className="job-company">CÔNG TY TNHH THƯƠNG MẠI VÀ ĐẦU TƯ SRT VIỆT NAM</p>
                <div className="job-info">
                    <span className="location">Hà Nội, Hà Nam</span>
                    <span className="deadline">Còn 19 ngày để ứng tuyển</span>
                </div>
            </div>
            <div className="job-salary">
                <p>6 - 21 triệu</p>
            </div>
            <div className="apply-button">
                <button>Ứng tuyển</button>
            </div>
        </div>
    );
};

JobCardCompany.propTypes = {
    
};

export default JobCardCompany;