import React from 'react';
import './index.css';
import {configColor} from "../../../../ConfigColor";

function JobDescription(props) {
    const onOpen = props.onOpen
    return (
        <div className="job-details-container">
            <div className="job-details-header">
                <h2>Chi tiết tin tuyển dụng</h2>
                <button className="job-alert-button">Gửi tôi việc làm tương tự</button>
            </div>

            {/* Job Categories */}
            <div className="job-categories">
                <span>Kế toán nội bộ</span>
                <span>Logistic / Vận tải</span>
                <span>Xuất nhập khẩu / Hải quan</span>
            </div>

            {/* Job Description */}
            <div className="job-section">
                <h3>Mô tả công việc</h3>
                <ul>
                    <li>Xuất hoá đơn tài chính.</li>
                    <li>Quản lý và theo dõi các hợp đồng dịch vụ.</li>
                    <li>Theo dõi công nợ.</li>
                    <li>Thực hiện các lệnh thanh toán, vay ngân hàng.</li>
                    <li>Kiểm tra chi tiết và tổng hợp các tài khoản.</li>
                    <li>Các công việc được phân công của Trưởng nhóm/ Kế toán trưởng.</li>
                </ul>
            </div>

            {/* Candidate Requirements */}
            <div className="job-section">
                <h3>Yêu cầu ứng viên</h3>
                <ul>
                    <li>Tốt nghiệp chuyên ngành kế toán.</li>
                    <li>Ít nhất 1 năm kinh nghiệm lĩnh vực Logistics.</li>
                    <li>Cẩn thận, chăm chỉ, không ngại khó.</li>
                </ul>
            </div>

            {/* Benefits */}
            <div className="job-section">
                <h3>Quyền lợi</h3>
                <ul>
                    <li>Lương: 9 - 12 triệu</li>
                    <li>Thưởng theo Quý, Lễ, Tết, thưởng bất ngờ theo kết quả,…</li>
                    <li>Nghỉ phép, BHXH, các chế độ theo Luật lao động.</li>
                    <li>Môi trường làm việc vui vẻ, năng động.</li>
                </ul>
            </div>

            {/* Location */}
            <div className="job-section">
                <h3>Địa điểm làm việc</h3>
                <p>Hồ Chí Minh: Lầu 04, Tòa nhà Đinh Lễ, số 01 Đinh Lễ, P.13, Quận 4</p>
            </div>

            {/* Working Hours */}
            <div className="job-section">
                <h3>Thời gian làm việc</h3>
                <p>Thứ 2 - Thứ 6 (từ 08:00 đến 17:30)</p>
            </div>

            {/* Application Instructions */}
            <div className="job-section">
                <h3>Cách thức ứng tuyển</h3>
                <p>Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây.</p>
                <p><strong>Hạn nộp hồ sơ:</strong> 29/11/2024</p>
            </div>

            {/* Action Buttons */}
            <div className="button-container">
                <button className="apply-button" style={{background: configColor}} onClick={onOpen}>Ứng tuyển ngay
                </button>
                <button className="save-button">Lưu tin</button>
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
