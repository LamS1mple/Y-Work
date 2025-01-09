import React from 'react';
import './index.css';
import {FaDollarSign, FaMapMarkerAlt, FaCalendarAlt, FaClock} from 'react-icons/fa';
import {AiOutlineCheckCircle, AiOutlineHeart} from 'react-icons/ai';
import {configColor} from '../../../../ConfigColor'

function JobOverview(props) {
    const job = props.workDetail
    if (Object.keys(job).length === 0) return (<div></div>)
    console.log(job)
    const location = new Set(job.locations.map(location => location.name))
    const listLocation = location.size <= 2 ? [...location].join(',') : `${[...location][0]} & ${location.size - 1} nơi khác`

    // Kiểm tra hạn nộp hồ sơ và trạng thái
    const currentDate = new Date();
    const dueDateString = job.dueDate && typeof job.dueDate === 'string' ? job.dueDate.split(' ')[0] : null;
    const dueDate = dueDateString ? new Date(dueDateString) : null;
    const isDisabled = !dueDate || dueDate < currentDate || job.status === 0; // Inactive nếu không có dueDate, quá hạn hoặc status = 0
    const onOpen = props.onOpen
    return (
        <div className="job-card-container" style={{maxWidth:"700px"}}>
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
                        <div>{job.convertSalary}</div>
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
                <button
                    className="apply-button"
                    style={{
                        background: isDisabled ? '#ccc' : configColor, // Màu xám nếu nút bị inactive
                        cursor: isDisabled ? 'not-allowed' : 'pointer'
                    }}
                    onClick={!isDisabled ? onOpen : null} // Chỉ cho phép click khi nút active
                    disabled={isDisabled} // Thuộc tính disabled
                >
                    Ứng tuyển ngay
                </button>

            </div>
        </div>
    );
}

export default JobOverview;
