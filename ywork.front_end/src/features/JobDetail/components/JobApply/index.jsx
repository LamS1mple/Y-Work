import React, {useState} from 'react';
import './index.css';
import {configColor} from "../../../../ConfigColor";
import workApi from "../../../../api/workApi";

function JobApply({onClose, workDetail}) {
    const [selectedOption, setSelectedOption] = useState('1');

    // Hàm xử lý khi thay đổi lựa chọn
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const applyCv = (e) => {
        // e.preventDefault();
        const form = new FormData();
        form.append("file", selectedFile)
        form.append("workId", workDetail.workId)
        form.append("optionUpload", selectedOption)
        console.log(form)
        const postData = async (form) => {
            console.log(form)
            try {
                await workApi.createCandidate(form)
                onClose()
            } catch (err) {

            }
        }
        postData(form)
    }

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedOption('2');

        setSelectedFile(event.target.files[0]); // Lưu tệp đã chọn
    };

    return (
        <div className="modal-overlay">
            <div style={{overflow: "scroll", height: "500px"}} className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2 style={{color: configColor}}>{workDetail.nameWork}</h2>

                <div className="modal-section">
                    <h3>Chọn CV để ứng tuyển</h3>
                    <div className="cv-options">
                        {/*<label>*/}
                        {/*    <input type="radio" name="cvOption" defaultChecked/>*/}
                        {/*    CV ứng tuyển gần nhất: CV*/}
                        {/*    <button className="view-button">Xem</button>*/}
                        {/*</label>*/}
                        <div className="upload-option">
                            <label>
                                <input type="radio" name="cvOption" value={'1'} checked={selectedOption === '1'}
                                       onChange={handleOptionChange}/>
                                <p>Chọn CV khác trong thư viện CV của tôi</p>
                            </label>
                        </div>
                        <div className="upload-option">
                            <input type="radio" id={'2'} value={'2'} checked={selectedOption === '2'} name="cvOption"
                                   onChange={handleOptionChange}/>
                            <label
                                htmlFor="fileUpload"
                                style={{
                                    display: "block",
                                    border: "1px dashed #ddd",
                                    padding: "20px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                }}
                            >
                                <span style={{fontWeight: "bold"}}>
                                  Tải lên CV từ máy tính, chọn hoặc kéo thả
                                </span>
                                <button
                                    type="button"
                                    className="upload-button"
                                    style={{
                                        marginLeft: "10px",
                                        background: "#2ba64b",
                                        color: "#fff",
                                        border: "none",
                                        padding: "5px 10px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Chọn CV
                                </button>
                                <p style={{marginTop: "10px", fontSize: "14px", color: "#666"}}>
                                    Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới 5MB
                                </p>

                                {/* Input file */}
                                <input
                                    id="fileUpload"
                                    type="file"
                                    accept=".doc,.docx,.pdf"
                                    style={{display: "none"}} // Ẩn input file
                                    onChange={handleFileChange}
                                />
                            </label>

                            {/* Hiển thị tên tệp đã chọn */}
                            {selectedFile && (
                                <div style={{marginTop: "15px", fontSize: "14px"}}>
                                    <strong>Tệp đã chọn:</strong> {selectedFile.name}
                                </div>
                            )}

                            {/*<div className="details-form">*/}
                            {/*    <h4>Vui lòng nhập đầy đủ thông tin chi tiết:</h4>*/}
                            {/*    <span>(* Thông tin bắt buộc)</span>*/}
                            {/*    <div className="form-group">*/}
                            {/*        <label htmlFor="fullName">Họ và tên *</label>*/}
                            {/*        <input type="text" id="fullName" value="Nguyễn Công Lâm"/>*/}
                            {/*    </div>*/}
                            {/*    <div className="form-group">*/}
                            {/*        <label htmlFor="email">Email *</label>*/}
                            {/*        <input type="email" id="email" value="lamlinhkhang0022@gmail.com"/>*/}
                            {/*        <label htmlFor="phone">Số điện thoại *</label>*/}
                            {/*        <input type="text" id="phone" value="0974206832"/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>

                <div className="modal-section">
                    <h3>Thư giới thiệu:</h3>
                    <textarea placeholder="Nhập thư giới thiệu ngắn gọn..."
                              defaultValue="Em tên là Nguyễn Công Lâm, sinh viên năm 4 trường Học viện công nghệ Bưu chính Viễn Thông chuyên ngành công nghệ phần mềm..."></textarea>
                </div>

                <div className="modal-buttons">
                    <button className="cancel-button" onClick={onClose}>Hủy</button>
                    <button className="submit-button" onClick={applyCv}>Nộp hồ sơ ứng tuyển</button>
                </div>
            </div>
        </div>
    );
}

export default JobApply
