import React, {useEffect, useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Avatar,
    Typography,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Stack,
} from "@mui/material";
import companyApi from "../../../../api/companyApi";
import {useParams} from "react-router-dom";

const applicants = [
    {
        id: 1,
        image: "https://via.placeholder.com/50",
        name: "Nguyễn Văn A",
        phone: "0987654321",
        email: "nguyenvana@gmail.com",
        appliedDate: "01-12-2024",
        status: "pending",
    },
    {
        id: 2,
        image: "https://via.placeholder.com/50",
        name: "Trần Thị B",
        phone: "0912345678",
        email: "tranthib@gmail.com",
        appliedDate: "28-11-2024",
        status: "accepted",
    },
    {
        id: 3,
        image: "https://via.placeholder.com/50",
        name: "Lê Văn C",
        phone: "0934567890",
        email: "levanc@gmail.com",
        appliedDate: "25-11-2024",
        status: "rejected",
    },
];

const CompanyStaff = () => {
    const {companyId} = useParams();
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("1");
    useEffect(() => {
        companyApi.candidateApplyCompany(companyId)
            .then(res=> {
                setData(res.object)
            }).catch(error => console.log(error))
    }, []);

    // Xử lý tìm kiếm
    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    // Xử lý lọc trạng thái
    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };

    // Lọc dữ liệu theo tìm kiếm và trạng thái
    const filteredData = data.filter(
        (applicant) =>
            applicant.nameAccount.toLowerCase().includes(searchQuery) &&
            (filterStatus === "" || applicant.status == filterStatus)
    );

    const [error, setError] = useState(null);

    const handleRoleChange = (id, roleId) => {
        const updatedData = data.map((applicant) =>
            applicant.companyManagerId === id ? { ...applicant, roleId } : applicant
        );

        // Xử lý giá trị trống hoặc roleId hợp lệ
        const rolePayload = roleId || null; // Nếu roleId là "", gửi null lên API
        companyApi
            .candidateChangeStatusCompany({ companyManagerId: id, roleId: rolePayload, companyId })
            .then((res) => {
                setData(updatedData);
                setError(null); // Xóa lỗi nếu tải dữ liệu thành công
            })
            .catch((error) => {
                if (error.response && error.response.status === 403) {
                    setError("Bạn không có quyền truy cập vào chức năng này.");
                } else {
                    setError("Đã xảy ra lỗi khi tải dữ liệu.");
                }
            });
    };

    const handleAction = (id, action) => {
        const updatedData = data.map((applicant) =>
            applicant.companyManagerId === id ? { ...applicant, status: action } : applicant
        );
        companyApi.candidateChangeStatusCompany({companyManagerId:id, status:action, companyId})
            .then(res=>{
                setData(updatedData);
            })
            .catch(error=> console.log(error))
        // alert(`Ứng viên ${action === "accepted" ? "chấp nhận" : "từ chối"} thành công!`);
    };
    const handleCloseError = () => {
        setError(null); // Xóa lỗi khi người dùng tắt thông báo
    };
    if (error) {
        return (
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999, // Đảm bảo lớp phủ nằm trên tất cả
                }}
            >
                <Box
                    sx={{
                        bgcolor: "#f8d7da",
                        color: "#721c24",
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        textAlign: "center",
                        maxWidth: "400px",
                        width: "90%",
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        {error}
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleCloseError}
                    >
                        Đóng
                    </Button>
                </Box>
            </Box>
        );
    }
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
                Danh sách ứng viên
            </Typography>

            {/* Thanh tìm kiếm và bộ lọc */}
            <Stack direction="row" spacing={2} mb={3}>
                <TextField
                    label="Tìm kiếm ứng viên"
                    variant="outlined"
                    fullWidth
                    onChange={handleSearch}
                />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                        value={filterStatus}
                        onChange={handleFilterChange}
                        label="Trạng thái"
                    >
                        <MenuItem value="1">Nhân viên</MenuItem>
                        <MenuItem value="2">Duyệt nhân viên</MenuItem>
                        <MenuItem value="3">Đã từ chối</MenuItem>
                    </Select>
                </FormControl>
            </Stack>

            {/* Bảng dữ liệu */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ảnh đại diện</TableCell>
                            <TableCell>Tên người ứng tuyển</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Ngày ứng tuyển</TableCell>
                            {filterStatus == 1 ? (
                                <TableCell>Chức vụ</TableCell>
                            ) : (
                                <TableCell>Hành động</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((applicant) => (
                            <TableRow key={applicant.companyManagerId}>
                                <TableCell>
                                    <Avatar
                                        src={applicant.image}
                                        alt={applicant.name}
                                        sx={{ width: 50, height: 50 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight="bold">{applicant.nameAccount}</Typography>
                                </TableCell>
                                <TableCell>{applicant.phoneNumber}</TableCell>
                                <TableCell>{applicant.email}</TableCell>
                                <TableCell>{applicant.dateCreated}</TableCell>
                                {filterStatus == 1 ? (
                                    <TableCell>
                                        <FormControl fullWidth>
                                            <Select
                                                value={applicant.roleId || ""} // Giá trị của chức vụ
                                                onChange={(e) => handleRoleChange(applicant.companyManagerId, e.target.value)}
                                                size="small"
                                                displayEmpty
                                            >
                                                {/* Các tùy chọn chức vụ */}
                                                <MenuItem value="">Không có chức vụ</MenuItem>
                                                <MenuItem value="da68c205-1907-43a0-924d-f66d817e0f2b">Nhân viên</MenuItem>
                                                <MenuItem value="2f56c5fb-74e4-49bb-8e5f-61ef13c02864">Quản lý</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                ) : (filterStatus == 2 ?(
                                    <TableCell>
                                        <div style={{display:"flex"}}>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                sx={{ marginRight: 1 }}
                                                onClick={() => handleAction(applicant.companyManagerId, 1)}
                                                disabled={applicant.status == 1}
                                            >
                                                Chấp nhận
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleAction(applicant.companyManagerId, 3)}
                                                disabled={applicant.status == 3}
                                            >
                                                Từ chối
                                            </Button>
                                        </div>
                                    </TableCell>
                                ):(
                                    <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleAction(applicant.id, 3)}
                                        disabled={applicant.status == 3}
                                    >
                                        Đã từ chối
                                    </Button>
                                    </TableCell>
                                )) }

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CompanyStaff;
