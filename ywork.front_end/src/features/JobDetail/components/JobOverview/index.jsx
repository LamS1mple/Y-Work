import React from 'react';
import './index.css';

function JobOverview() {
    return (
        <div className="job-overview-container">
            {/* Job Title */}
            <h2 className="job-overview-title">Kỹ Thuật Điện / Kỹ Sư Điện (Lương 15-30 Triệu)</h2>

            {/* Job Information Section */}
            <div className="job-info-section">
                <div className="job-info-item">
                    <span role="img" aria-label="salary">💵</span>
                    <div>
                        <strong>Mức lương</strong>
                        <div>15 - 30 triệu</div>
                    </div>
                </div>
                <div className="job-info-item">
                    <span role="img" aria-label="location">📍</span>
                    <div>
                        <strong>Địa điểm</strong>
                        <div>Hà Nam, Hà Nội</div>
                    </div>
                </div>
                <div className="job-info-item">
                    <span role="img" aria-label="experience">⏳</span>
                    <div>
                        <strong>Kinh nghiệm</strong>
                        <div>2 năm</div>
                    </div>
                </div>
                <div className="job-info-item">
                    <span role="img" aria-label="deadline">📅</span>
                    <div>
                        <strong>Hạn nộp hồ sơ</strong>
                        <div>12/12/2024</div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="button-container">
                <button className="apply-button">Ứng tuyển ngay</button>
                <button className="save-button">Lưu tin</button>
            </div>
        </div>
    );
}

export default JobOverview;
