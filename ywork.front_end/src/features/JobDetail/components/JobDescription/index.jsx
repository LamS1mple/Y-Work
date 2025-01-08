import React from 'react';
import './index.css';
import {configColor} from "../../../../ConfigColor";

function JobDescription(props) {
    const job = props.workDetail
    console.log(job)
    const onOpen = props.onOpen
    const li = (data) => data && data.split("\n") // Tách từng dòng
        .map((line) => line.trim()) // Loại bỏ khoảng trắng thừa
        .filter((line) => line.length > 0) // Loại bỏ dòng trống
        .map((line, index) => <li key={index}>{line}</li>);
    return (
        <div className="job-details-container">
            <div className="job-details-header">
                <h2>Chi tiết tin tuyển dụng</h2>

            </div>

            {/* Job Categories */}
            {/*<div className="job-categories">*/}
            {/*    <span>Kế toán nội bộ</span>*/}
            {/*    <span>Logistic / Vận tải</span>*/}
            {/*    <span>Xuất nhập khẩu / Hải quan</span>*/}
            {/*</div>*/}

            {/* Job Description */}
            <div className="job-section">
                <h3>Mô tả công việc</h3>
                <p style={{whiteSpace:"pre"}}>

                </p>
                <ul>
                    {li(job.description)}
                </ul>
            </div>

            {/* Candidate Requirements */}
            <div className="job-section">
                <h3>Yêu cầu ứng viên</h3>


                <ul>
                    {li(job.requirements)}

                </ul>
            </div>

            {/* Benefits */}
            <div className="job-section">
                <h3>Quyền lợi</h3>
                <p style={{whiteSpace: "pre"}}>

                </p>
                <ul>
                    {li(job.benefits)}
                    {/*<li>Lương: 9 - 12 triệu</li>*/}
                    {/*<li>Thưởng theo Quý, Lễ, Tết, thưởng bất ngờ theo kết quả,…</li>*/}
                    {/*<li>Nghỉ phép, BHXH, các chế độ theo Luật lao động.</li>*/}
                    {/*<li>Môi trường làm việc vui vẻ, năng động.</li>*/}
                </ul>
            </div>

            {/* Location */}
            <div className="job-section">
                <h3>Địa điểm làm việc</h3>

                <ul>
                    {li(job.workLocation)}
                </ul>
            </div>

            {/* Working Hours */}
            {/*<div className="job-section">*/}
            {/*<h3>Thời gian làm việc</h3>*/}
            {/*    */}
            {/*    <p>Thứ 2 - Thứ 6 (từ 08:00 đến 17:30)</p>*/}
            {/*</div>*/}

            {/* Application Instructions */}
            <div className="job-section">
                <h3>Cách thức ứng tuyển</h3>
                <p>Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây.</p>
                <p><strong>Hạn nộp hồ sơ:</strong> {job.dueDate}</p>
            </div>

            {/* Action Buttons */}
            <div className="button-container">
                <button className="apply-button" style={{background: configColor}} onClick={onOpen}>Ứng tuyển ngay
                </button>
            </div>

            {/* Report Section */}
            <div className="report-section">
                <p>Báo cáo tin tuyển dụng: Nếu bạn thấy rằng tin tuyển dụng này không đúng hoặc có dấu hiệu lừa đảo, hãy
                    phản ánh với chúng tôi.</p>
            </div>
        </div>
    );
}

export default JobDescription;
