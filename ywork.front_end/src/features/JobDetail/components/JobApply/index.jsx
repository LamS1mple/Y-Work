import React from 'react';
import './index.css';

function JobApply({ onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Ứng tuyển Kế Toán Nội Bộ (Mức Lương 9 - 12 Triệu)</h2>

                <div className="modal-section">
                    <h3>Chọn CV để ứng tuyển</h3>
                    <div className="cv-options">
                        <label>
                            <input type="radio" name="cvOption" defaultChecked />
                            CV ứng tuyển gần nhất: CV
                            <button className="view-button">Xem</button>
                        </label>
                        <label>
                            <input type="radio" name="cvOption" />
                            Chọn CV khác trong thư viện CV của tôi
                        </label>
                        <label className="upload-option">
                            <input type="radio" name="cvOption" />
                            Tải lên CV từ máy tính
                            <button className="upload-button">Chọn CV</button>
                            <p>Hỗ trợ .doc, .docx, pdf có kích thước dưới 5MB</p>
                        </label>
                    </div>
                </div>

                <div className="modal-section">
                    <h3>Thư giới thiệu:</h3>
                    <textarea placeholder="Nhập thư giới thiệu ngắn gọn..." defaultValue="Em tên là Nguyễn Công Lâm, sinh viên năm 4 trường Học viện công nghệ Bưu chính Viễn Thông chuyên ngành công nghệ phần mềm..."></textarea>
                </div>

                <div className="modal-buttons">
                    <button className="cancel-button" onClick={onClose}>Hủy</button>
                    <button className="submit-button">Nộp hồ sơ ứng tuyển</button>
                </div>
            </div>
        </div>
    );
}

export default JobApply
