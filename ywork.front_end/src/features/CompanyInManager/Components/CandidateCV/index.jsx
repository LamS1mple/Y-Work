import React, {useEffect, useState} from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    Button,
    Chip,
} from '@mui/material';
import companyApi from "../../../../api/companyApi";
import {useParams} from "react-router-dom";
import imageDefault from '../../../../default.png'

// Các trạng thái với value tương ứng
const statusOptions = [
    { label: 'Duyệt', value: 1 },
    { label: 'Từ chối', value: 2 },
    { label: 'Chưa xác định', value: 3 },
];

const initialData = [
    {
        id: 1,
        avatar: 'https://via.placeholder.com/50',
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        date: '2024-11-28',
        cvViewed: false,
        status: 3, // Giá trị tương ứng với "Chưa xác định"
    },
    {
        id: 2,
        avatar: 'https://via.placeholder.com/50',
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        date: '2024-11-27',
        cvViewed: true,
        status: 1, // Giá trị tương ứng với "Duyệt"
    },
];

const CandidateCV = () => {
    const {companyId, workId}= useParams();
    const [data, setData] = useState(initialData);
    useEffect(() => {
        companyApi.candidateList({companyId, workId})
            .then(response =>{
                setData(response.object)
            })
            .catch(error => console.log(error))
    }, []);
    // Hàm xử lý khi nhấn "Xem CV"
    const handleViewCV = (handleData) => {
        console.log(handleData)
        if (handleData.status === 4){
            const updatedData = data.map((row) =>

                row.candidateId === handleData.candidateId ? { ...row, status:3 } : row
            );
            setData(updatedData);
            const dataPost = {
                candidateId:handleData.candidateId,
                companyId,
                status:3
            }
            companyApi.candidateChangeStatus(dataPost)
                .then(res=>{

                }).catch(error=> console.log(error))
            // const updatedCandidate = updatedData.find((row) => row.candidate === handleData.candidate);
            // console.log('Cập nhật ứng viên:', updatedCandidate);
        }
        window.open(handleData.urlFile, '_blank');
    };

    // Hàm xử lý thay đổi trạng thái duyệt/từ chối
    const handleStatusChange = (candidateId, newStatus) => {
        const updatedData = data.map((row) =>
            row.candidateId === candidateId ? { ...row, status: newStatus } : row
        );
        setData(updatedData);
        const dataPost = {
            candidateId,
            companyId,
            status:newStatus
        }
        companyApi.candidateChangeStatus(dataPost)
            .then(res=>{

            }).catch(error=> console.log(error))
        // Lắng nghe thay đổi trạng thái
        // const updatedCandidate = updatedData.find((row) => row.candidateId === id);
        // console.log('Trạng thái mới của ứng viên:', updatedCandidate);
    };

    // Hàm xác định màu sắc cho mỗi dòng dựa trên trạng thái
    const getRowStyle = (status) => {
        switch (status) {
            case 1:
                return { backgroundColor: '#d4edda' }; // Xanh nhạt
            case 2:
                return { backgroundColor: '#f8d7da' }; // Đỏ nhạt

            default:
                return { backgroundColor: '#ffffff' }; // Màu trắng
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Số thứ tự</TableCell>
                        <TableCell>Ảnh đại diện</TableCell>
                        <TableCell>Tên</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Ngày</TableCell>
                        <TableCell>Xem CV</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Đã xem CV</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={row.candidateId} style={getRowStyle(row.status)}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <img
                                    src={row.urlAvatar || imageDefault }
                                    alt={row.nameAccount}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                />
                            </TableCell>
                            <TableCell>{row.nameAccount}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.dateCreated}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleViewCV(row)}
                                >
                                    Xem CV
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={row.status === 4 ? 3: row.status}
                                    onChange={(e) => handleStatusChange(row.candidateId, parseInt(e.target.value, 10))}
                                    displayEmpty
                                >
                                    {statusOptions.map((status) => (
                                        <MenuItem key={status.value} value={status.value}>
                                            {status.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                            <TableCell>
                                {row.status <= 3 ? (
                                    <Chip label="Đã xem" color="success" />
                                ) : (
                                    <Chip label="Chưa xem" color="default" />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CandidateCV;
