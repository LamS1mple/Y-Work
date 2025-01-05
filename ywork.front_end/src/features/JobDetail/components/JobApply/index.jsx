import React, {useEffect, useState} from 'react';
import './index.css';
import { configColor } from "../../../../ConfigColor";
import workApi from "../../../../api/workApi";
import Notification from "../../../Notification";
import userApi from "../../../../api/userApi";

function JobApply({ onClose, workDetail }) {
    const [selectedOption, setSelectedOption] = useState('1');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedLibraryCv, setSelectedLibraryCv] = useState('');
    const [hoveredCv, setHoveredCv] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [notification, setNotification] = useState(null); // Quản lý thông báo
    const [listCV, setListCV]= useState([])

    useEffect(() => {
        userApi.listCV()
            .then((res) => {
                const result = res.object;
                const parsedData = result.map((element) => ({
                    ...element,
                    cv: JSON.parse(element.info),
                }));

                setListCV(parsedData.map((element) => ({
                    key: element.cvId,
                    name: element.cv.title,
                    createdDate: element.createCV,
                    modifiedDate: element.updateCV,
                    status: element.status === 1,
                    typeCV: element.cv.typeCV,
                })));
            })
            .catch((error) => {
                console.error('Error fetching CV data:', error);
            });
    }, []);
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleLibraryCvChange = (cv) => {
        setSelectedLibraryCv(cv);
    };

    const applyCv = () => {
        const form = new FormData();
        if (selectedOption === '2') {
            form.append("file", selectedFile);

        } else {
            form.append("libraryCv", selectedLibraryCv);

        }
        form.append("workId", workDetail.workId);
        form.append("optionUpload", selectedOption);

        const postData = async (form) => {
            try {
                const response = await workApi.createCandidate(form);
                if (response && response.messages === 'ok') {

                    setNotification({
                        type: "success",
                        message: "Ứng tuyển thành công!",
                    });
                    setTimeout(() =>{
                        onClose();
                        setNotification(null)
                    } , 2000); // Tự động ẩn thông báo sau 2 giây

                }
            } catch (err) {
                console.error(err);
                setNotification({
                    type: "error",
                    message: "Đã xảy ra lỗi khi ứng tuyển. Vui lòng thử lại.",
                });
                setTimeout(() => setNotification(null), 3000); // Tự động ẩn thông báo sau 3 giây
            }
        };
        postData(form);
    };

    const handleFileChange = (event) => {
        setSelectedOption('2');
        setSelectedFile(event.target.files[0]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);

        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setSelectedOption('2');
            setSelectedFile(event.dataTransfer.files[0]);
        }
    };

    return (
        <div className="modal-overlay">
            <div style={{ overflow: "scroll", height: "500px" }} className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2 style={{ color: configColor }}>{workDetail.nameWork}</h2>

                <div className="modal-section">
                    <h3>Chọn CV để ứng tuyển</h3>
                    <div className="cv-options">
                        {/* Thư viện CV */}
                        <div className="upload-option">
                            <label>
                                <input
                                    type="radio"
                                    name="cvOption"
                                    value="1"
                                    checked={selectedOption === '1'}
                                    onChange={handleOptionChange}
                                />
                                <p>Chọn CV khác trong thư viện CV của tôi</p>
                            </label>

                            {selectedOption === '1' && (
                                <div style={{ marginTop: "10px" }}>
                                    <h4>Danh sách CV trong thư viện:</h4>
                                    <ul className="cv-list">
                                        {listCV.map((cv, index) => (
                                            <li
                                                key={cv.key}
                                                className="cv-item"
                                                onMouseEnter={() => setHoveredCv(cv.key)}
                                                onMouseLeave={() => setHoveredCv('')}
                                            >
                                                <span style={{maxWidth:"260px"}}>{cv.name}</span>
                                                {hoveredCv === cv.key && (
                                                    <span className="view-link" onClick={()=>{
                                                        window.open(`/view-cv/${cv.key}`, '_blank')
                                                    }}>Xem</span>
                                                )}
                                                <button
                                                    className={`select-button ${
                                                        selectedLibraryCv === cv.key ? 'selected' : ''
                                                    }`}
                                                    onClick={() => handleLibraryCvChange(cv.key)}
                                                >
                                                    Chọn CV
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Tải lên CV */}
                        <div
                            className={`upload-option drop-zone ${dragActive ? 'active' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input
                                type="radio"
                                id="2"
                                value="2"
                                checked={selectedOption === '2'}
                                name="cvOption"
                                onChange={handleOptionChange}
                            />
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
                                <span style={{ fontWeight: "bold" }}>
                                    Kéo và thả CV vào đây hoặc chọn từ máy tính
                                </span>
                                <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
                                    Hỗ trợ định dạng .doc, .docx, pdf có kích thước dưới 5MB
                                </p>

                                <input
                                    id="fileUpload"
                                    type="file"
                                    accept=".doc,.docx,.pdf"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                            </label>

                            {selectedFile && (
                                <div style={{ marginTop: "15px", fontSize: "14px" }}>
                                    <strong>Tệp đã chọn:</strong> {selectedFile.name}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {notification && (
                    <Notification
                        type={notification.type}
                        message={notification.message}
                        onClose={() => setNotification(null)}
                    />
                )}

                <div className="modal-buttons">
                    <button className="cancel-button" onClick={onClose}>Hủy</button>
                    <button className="submit-button" onClick={applyCv}>Nộp hồ sơ ứng tuyển</button>
                </div>
            </div>
        </div>
    );
}

export default JobApply;
