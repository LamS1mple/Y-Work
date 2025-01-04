import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Resume1Image from './CV1.jpg';
import Resume2Image from './CV2.png';
import './index.css';
import { Table, Button, Switch } from 'antd';
import userApi from '../../api/userApi';

const Resume = () => {
    const tooltipRef = useRef(null);
    const [zoomedPicture, setZoomedPicture] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const [data, setData] = useState([]); // Dữ liệu gốc từ API
    const [tableData, setTableData] = useState([]); // Dữ liệu hiển thị trong bảng
    const [selectedCV, setSelectedCV] = useState(null); // Dữ liệu cho bảng chi tiết
    const navi = useNavigate()

    // Lấy dữ liệu từ API khi component được mount
    useEffect(() => {
        userApi.listCV()
            .then((res) => {
                const result = res.object;
                const parsedData = result.map((element) => ({
                    ...element,
                    cv: JSON.parse(element.info),
                }));

                setData(parsedData); // Lưu dữ liệu gốc
                setTableData(parsedData.map((element) => ({
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

    // Xử lý bật/tắt trạng thái của CV
    const handleSwitchChange = (checked, recordKey) => {
        userApi.changeStatusCV({status: checked?1:0,
        cvId: recordKey})
        console.log(checked, recordKey);
        setTableData((prevData) =>
            prevData.map((item) =>
                item.key === recordKey ? { ...item, status: checked } : item
            )
        );
    };

    // Xử lý khi click vào ảnh để phóng to
    const handlePictureClick = (picture) => {
        setZoomedPicture(picture);
    };

    // Đóng ảnh phóng to
    const closeZoomedPicture = () => {
        setZoomedPicture(null);
    };

    // Hiển thị tooltip
    const toggleTooltip = (event, show) => {
        setShowTooltip(show);

        if (tooltipRef.current) {
            tooltipRef.current.style.left = `${
                event.currentTarget.offsetLeft + event.currentTarget.offsetWidth / 2
            }px`;
            tooltipRef.current.style.top = `${
                event.currentTarget.offsetTop + event.currentTarget.offsetHeight
            }px`;
        }
    };

    // Định nghĩa các cột trong bảng chính
    const columns = [
        {
            title: 'Tên CV',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            key: 'createdDate',
        },
        {
            title: 'Ngày sửa',
            dataIndex: 'modifiedDate',
            key: 'modifiedDate',
        },
        {
            title: 'Bật gợi ý công việc',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Switch
                    checked={status}
                    onChange={(status) => handleSwitchChange(status, record.key)}
                />
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                        type="primary"
                        onClick={() => window.open(`/view-cv/${record.key}`, '_blank')}
                    >
                        Xem
                    </Button>
                    <Button type="default"
                            onClick={() => navi(`/save-cv/${record.key}/${record.typeCV}`)}>Chỉnh sửa</Button>
                    <Button type="danger">Xóa</Button>
                </div>
            ),
        },
    ];

    // Định nghĩa các cột trong bảng chi tiết
    const detailColumns = [
        {
            title: 'Field',
            dataIndex: 'field',
            key: 'field',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
    ];

    // Dữ liệu cho bảng chi tiết
    const detailData = selectedCV
        ? Object.entries(selectedCV).map(([key, value]) => ({
            key,
            field: key,
            value: JSON.stringify(value), // Hiển thị giá trị dạng chuỗi JSON
        }))
        : [];

    return (
        <div>
            <div className="list-my-cv">
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={{ pageSize: 4 }}
                />
            </div>

            {selectedCV && (
                <div className="detail-table">
                    <h3>Chi tiết CV: {selectedCV.name}</h3>
                    <Table
                        columns={detailColumns}
                        dataSource={detailData}
                        pagination={false}
                    />
                </div>
            )}

            <div className="home-page">
                <div className="pictures">
                    <img
                        src={Resume1Image}
                        alt="First Resume"
                        onClick={() => handlePictureClick(Resume1Image)}
                        onMouseEnter={(e) => toggleTooltip(e, true)}
                        onMouseLeave={(e) => toggleTooltip(e, false)}
                    />
                    <img
                        src={Resume2Image}
                        alt="Second Resume"
                        onClick={() => handlePictureClick(Resume2Image)}
                        onMouseEnter={(e) => toggleTooltip(e, true)}
                        onMouseLeave={(e) => toggleTooltip(e, false)}
                    />
                    {showTooltip && (
                        <div className="tooltip" ref={tooltipRef}>
                            Click to zoom in
                        </div>
                    )}
                </div>
                <div className="buttons">
                    <Link to="/save-cv/save/1">
                        <button className="primary-btn">Chọn CV1</button>
                    </Link>
                    <Link to="/save-cv/save/2">
                        <button className="primary-btn">Chọn CV2</button>
                    </Link>
                </div>
                {zoomedPicture && (
                    <div className="zoomed-picture" onClick={closeZoomedPicture}>
                        <span className="close-btn" onClick={closeZoomedPicture}>
                            &times;
                        </span>
                        <img src={zoomedPicture} alt="Zoomed Picture" />
                    </div>
                )}
            </div>
        </div>
    );
};

Resume.propTypes = {};

export default Resume;
