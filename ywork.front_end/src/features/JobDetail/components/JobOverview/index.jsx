import React from 'react';
import './index.css';
import {FaDollarSign, FaMapMarkerAlt, FaCalendarAlt, FaClock} from 'react-icons/fa';
import {AiOutlineCheckCircle, AiOutlineHeart} from 'react-icons/ai';
import {configColor} from '../../../../ConfigColor'

function JobOverview(props) {
    const job = props.workDetail
    if (Object.keys(job).length === 0) return (<div></div>)
    console.log(job)
    const location = new Set(job.locations.map(location => location.provinceName))
    const listLocation = location.size <= 2 ? [...location].join(',') : `${[...location][0]}&${location.size - 1} nơi khác`

    const onOpen = props.onOpen
    return (
        <div className="job-card-container">
            {/* Job Title */}
            <h2 className="job-card-title">
                {job.nameWork} <AiOutlineCheckCircle className="status-icon"/>
            </h2>

            {/* Job Information Section */}
            <div className="job-info-section">
                <div className="job-info-item">
                    <div className={'icon-out'}>
                        <FaDollarSign className={'icon-in'}/>
                    </div>
                    <div>
                        <strong>Mức lương</strong>
                        <div>{job.wage.charAt(0) === 'T' ? job.wage : `${job.wage} triệu`}</div>
                    </div>
                </div>
                <div className="job-info-item">
                    <div className={'icon-out'}>
                        <FaMapMarkerAlt className={'icon-in'}/>
                    </div>

                    <div>
                        <strong>Địa điểm</strong>
                        <div>{listLocation}</div>
                    </div>
                </div>
                <div className="job-info-item">
                    <div className={'icon-out'}>
                        <FaClock className={'icon-in'}/>
                    </div>
                    <div>
                        <strong>Kinh nghiệm</strong>
                        <div>{job.experience}</div>
                    </div>
                </div>

            </div>
            <div style={{
                display: 'inline-flex', alignItems: 'center', background: '#f2f2f2',
                padding: '5px', borderRadius: '10px',
            }}>
                <div>
                    <FaCalendarAlt style={{color: configColor}}/>
                </div>
                <div style={{marginLeft: '10px'}}>
                    <strong>Hạn nộp hồ sơ</strong> {job.dueDate.split(' ')[0]}
                </div>

            </div>
            {/* Action Buttons */}
            <div className="button-container">
                <button className="apply-button" style={{background: configColor}} onClick={onOpen}>Ứng tuyển ngay
                </button>
                <button className="save-button">
                    <AiOutlineHeart/> Lưu tin
                </button>
            </div>
        </div>
    );
}

export default JobOverview;
